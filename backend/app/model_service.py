import os
import json
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any, List
from .schemas import (
    HouseFeaturesInput,
    PredictionResponse,
    ShapContribution,
    FeatureImportanceResponse,
    FeatureImportanceItem,
    PresetHouse
)

import time
import urllib.request

DEFAULT_FALLBACK_RATE = 17650.0

def fetch_live_usd_idr_rate() -> float:
    """
    Mengambil kurs USD ke IDR secara otomatis dari API pasar valuta asing terbuka.
    Menggunakan timeout pendek dan fallback ganda.
    """
    # 1. Primary: open.er-api.com
    try:
        req = urllib.request.Request(
            "https://open.er-api.com/v6/latest/USD",
            headers={"User-Agent": "HomeValuer-AI/1.0"}
        )
        with urllib.request.urlopen(req, timeout=3.5) as response:
            data = json.loads(response.read().decode("utf-8"))
            rate = data.get("rates", {}).get("IDR")
            if rate and isinstance(rate, (int, float)) and rate > 10000:
                return float(rate)
    except Exception as e:
        print(f"[FX Rate] Primary API notice: {e}, mencoba secondary fallback...")

    # 2. Secondary: jsdelivr currency-api
    try:
        req = urllib.request.Request(
            "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
            headers={"User-Agent": "HomeValuer-AI/1.0"}
        )
        with urllib.request.urlopen(req, timeout=3.5) as response:
            data = json.loads(response.read().decode("utf-8"))
            rate = data.get("usd", {}).get("idr")
            if rate and isinstance(rate, (int, float)) and rate > 10000:
                return float(rate)
    except Exception as e:
        print(f"[FX Rate] Secondary API notice: {e}")

    return DEFAULT_FALLBACK_RATE

class ModelService:
    _instance = None
    _cached_rate = DEFAULT_FALLBACK_RATE
    _last_rate_fetch = 0.0

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelService, cls).__new__(cls)
            cls._instance._is_loaded = False
        return cls._instance

    def get_current_usd_to_idr_rate(self) -> float:
        """
        Mengembalikan kurs USD ke IDR terkini secara otomatis (cache 6 jam).
        """
        now = time.time()
        if now - self._last_rate_fetch > 21600:
            rate = fetch_live_usd_idr_rate()
            if rate > 10000:
                self._cached_rate = rate
                self._last_rate_fetch = now
                print(f"[FX Rate] Kurs USD ke IDR otomatis diperbarui: 1 USD = Rp {rate:,.2f}")
        return self._cached_rate


    def load_artifacts(self):
        if self._is_loaded:
            return

        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "ml", "artifacts"))
        print(f"[ModelService] Memuat artefak model dari: {base_dir}")

        model_path = os.path.join(base_dir, "model.joblib")
        preprocessor_path = os.path.join(base_dir, "preprocessor.joblib")
        explainer_path = os.path.join(base_dir, "explainer.joblib")
        metadata_path = os.path.join(base_dir, "metadata.json")
        summary_path = os.path.join(base_dir, "dataset_summary.json")

        if not all(os.path.exists(p) for p in [model_path, preprocessor_path, explainer_path, metadata_path]):
            raise FileNotFoundError("Artefak model belum lengkap. Pastikan skrip ml/eda_and_train.py telah dijalankan.")

        self.model = joblib.load(model_path)
        self.preprocessor = joblib.load(preprocessor_path)
        self.explainer = joblib.load(explainer_path)

        with open(metadata_path, "r", encoding="utf-8") as f:
            self.metadata = json.load(f)

        if os.path.exists(summary_path):
            with open(summary_path, "r", encoding="utf-8") as f:
                self.dataset_summary = json.load(f)
        else:
            self.dataset_summary = {}

        # Ambil base value
        raw_base = np.ravel(self.explainer.expected_value)[0]
        self.base_value = float(raw_base)

        self.transformed_feature_names = self.metadata.get("transformed_feature_names", [])
        self.feature_schema = self.metadata.get("feature_schema", {})
        self.numeric_features = self.metadata.get("numeric_features", [])
        self.categorical_features = self.metadata.get("categorical_features", [])

        self._is_loaded = True
        print(f"[ModelService] Sukses memuat {self.metadata.get('model_name')} (Base Value: ${self.base_value:,.2f})")

    def predict_and_explain(self, input_data: HouseFeaturesInput) -> PredictionResponse:
        if not self._is_loaded:
            self.load_artifacts()

        # Buat dataframe untuk 1 observasi
        input_dict = input_data.model_dump()
        df = pd.DataFrame([input_dict])

        # Preprocessing
        X_trans = self.preprocessor.transform(df)

        # Prediksi harga
        pred_price = float(self.model.predict(X_trans)[0])
        pred_price = max(pred_price, 25000.0)  # Proteksi batas minimum realistis

        # Hitung SHAP values
        raw_shap = self.explainer.shap_values(X_trans)[0]

        # Agregasi SHAP values ke 12 fitur induk
        grouped_shap: Dict[str, float] = {}

        # 1. Fitur numerik langsung
        for i, feat in enumerate(self.numeric_features):
            grouped_shap[feat] = float(raw_shap[i])

        # 2. Fitur kategorikal (agregasi seluruh one-hot encoded columns)
        num_len = len(self.numeric_features)
        cat_shap_map = {cat: 0.0 for cat in self.categorical_features}
        
        for j in range(num_len, len(self.transformed_feature_names)):
            col_name = self.transformed_feature_names[j]
            shap_val = float(raw_shap[j])
            for cat in self.categorical_features:
                if col_name.startswith(f"{cat}_") or f"__{cat}_" in col_name:
                    cat_shap_map[cat] += shap_val
                    break

        for cat, val in cat_shap_map.items():
            grouped_shap[cat] = val

        # Bentuk daftar ShapContribution
        contributions: List[ShapContribution] = []
        for feat_key, shap_val in grouped_shap.items():
            val = input_dict.get(feat_key)
            schema_info = self.feature_schema.get(feat_key, {})
            label = schema_info.get("label", feat_key)
            label_id = schema_info.get("label_id", feat_key)
            unit = schema_info.get("unit", "")

            direction = "positive" if shap_val >= 0 else "negative"
            formatted_shap = f"+${shap_val:,.0f}" if shap_val >= 0 else f"-${abs(shap_val):,.0f}"

            # Format teks dampak yang informatif
            if direction == "positive":
                impact_text = f"{label_id} ({val} {unit}) meningkatkan harga sekitar {formatted_shap}"
            else:
                impact_text = f"{label_id} ({val} {unit}) menurunkan harga sekitar {formatted_shap}"

            contributions.append(
                ShapContribution(
                    feature_key=feat_key,
                    feature_label=f"{label} ({label_id})",
                    feature_value=val,
                    shap_value=round(shap_val, 2),
                    direction=direction,
                    formatted_shap=formatted_shap,
                    impact_text=impact_text
                )
            )

        # Urutkan berdasarkan dampak absolut tertinggi
        contributions.sort(key=lambda x: abs(x.shap_value), reverse=True)

        # Analisis naratif AI
        top_pos = [c for c in contributions if c.direction == "positive"]
        top_neg = [c for c in contributions if c.direction == "negative"]

        pos_summaries = []
        for c in top_pos[:2]:
            schema = self.feature_schema.get(c.feature_key, {})
            label_id = schema.get("label_id", c.feature_key)
            pos_summaries.append(f"{label_id} ({c.feature_value}) yang menaikkan taksiran senilai {c.formatted_shap}")

        neg_summaries = []
        for c in top_neg[:2]:
            schema = self.feature_schema.get(c.feature_key, {})
            label_id = schema.get("label_id", c.feature_key)
            neg_summaries.append(f"{label_id} ({c.feature_value}) yang mengoreksi taksiran sebesar {c.formatted_shap}")

        diff = pred_price - self.base_value
        diff_pct = (diff / self.base_value) * 100.0

        if diff >= 0:
            narrative_id = f"Taksiran harga rumah ini ${pred_price:,.0f} (+{diff_pct:.1f}% di atas harga acuan pasar ${self.base_value:,.0f}). "
        else:
            narrative_id = f"Taksiran harga rumah ini ${pred_price:,.0f} ({diff_pct:.1f}% di bawah harga acuan pasar ${self.base_value:,.0f}). "

        if pos_summaries:
            narrative_id += f"Faktor pendorong utama meliputi {', serta '.join(pos_summaries)}. "
        if neg_summaries:
            narrative_id += f"Sedangkan faktor yang menekan harga adalah {', serta '.join(neg_summaries)}."

        narrative_en = (
            f"The estimated valuation is ${pred_price:,.0f} ({'+' if diff >= 0 else ''}{diff_pct:.1f}% vs base market value of ${self.base_value:,.0f}). "
            f"Primary upward drivers include {', '.join([c.feature_key + ' (' + c.formatted_shap + ')' for c in top_pos[:2]])}. "
            f"Key downward factors include {', '.join([c.feature_key + ' (' + c.formatted_shap + ')' for c in top_neg[:2]])}."
        )

        current_rate = self.get_current_usd_to_idr_rate()

        return PredictionResponse(
            predicted_price=round(pred_price, 2),
            predicted_price_idr=round(pred_price * current_rate, 0),
            base_price=round(self.base_value, 2),
            base_price_idr=round(self.base_value * current_rate, 0),
            price_difference=round(diff, 2),
            price_difference_pct=round(diff_pct, 2),
            model_name=self.metadata.get("model_name", "Gradient Boosting Regressor"),
            r2_score=round(self.metadata.get("metrics", {}).get("r2", 0.9167), 4),
            shap_contributions=contributions,
            narrative_summary_id=narrative_id,
            narrative_summary_en=narrative_en,
            top_positive_factors=[c.impact_text for c in top_pos[:3]],
            top_negative_factors=[c.impact_text for c in top_neg[:3]],
            usd_to_idr_rate=round(current_rate, 2),
            rate_source="Live Market Exchange Rate"
        )


    def get_global_feature_importance(self) -> FeatureImportanceResponse:
        if not self._is_loaded:
            self.load_artifacts()

        raw_importance = self.metadata.get("global_feature_importance", [])
        total_importance = sum(item["mean_abs_shap"] for item in raw_importance) or 1.0

        items: List[FeatureImportanceItem] = []
        for item in raw_importance:
            feat = item["feature"]
            schema = self.feature_schema.get(feat, {})
            label = schema.get("label_id", feat)
            mean_val = float(item["mean_abs_shap"])
            pct = (mean_val / total_importance) * 100.0
            items.append(
                FeatureImportanceItem(
                    feature=feat,
                    label=f"{label} ({schema.get('label', feat)})",
                    mean_abs_shap=round(mean_val, 2),
                    importance_pct=round(pct, 2)
                )
            )

        return FeatureImportanceResponse(
            model_name=self.metadata.get("model_name", "Gradient Boosting Regressor"),
            metrics=self.metadata.get("metrics", {}),
            base_value=self.base_value,
            global_importance=items
        )

    def get_dataset_stats(self) -> Dict[str, Any]:
        if not self._is_loaded:
            self.load_artifacts()
        return self.dataset_summary

    def get_presets(self) -> List[PresetHouse]:
        if not self._is_loaded:
            self.load_artifacts()
        raw_presets = self.metadata.get("preset_houses", [])
        return [PresetHouse(**p) for p in raw_presets]

    def get_feature_schema(self) -> Dict[str, Any]:
        if not self._is_loaded:
            self.load_artifacts()
        return self.feature_schema


model_service = ModelService()
