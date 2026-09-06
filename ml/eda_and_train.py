"""
Eksplorasi Data (EDA), Preprocessing, Pelatihan Model, dan SHAP TreeExplainer
Dataset: Kaggle House Prices - Advanced Regression Techniques (Ames Housing)
"""

# pyright: reportMissingImports=false
import os
import json
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import xgboost as xgb
import shap

# 1. Konfigurasi Path
DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "raw", "train.csv")
ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), "artifacts")
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

print(f"--> Memuat data dari: {DATA_PATH}")
df = pd.read_csv(DATA_PATH)
print(f"Data shape: {df.shape}")

# 2. Pemilihan Fitur Kunci
# Fitur numerik dan kategorikal terpilih yang paling signifikan dan intuitif
NUMERIC_FEATURES = [
    "OverallQual",   # Kualitas material & finishing (1-10)
    "GrLivArea",      # Luas bangunan di atas tanah (sq ft)
    "TotalBsmtSF",    # Luas basement (sq ft)
    "GarageCars",     # Kapasitas mobil dalam garasi
    "YearBuilt",      # Tahun pembangunan asli
    "YearRemodAdd",   # Tahun renovasi
    "FullBath",       # Jumlah kamar mandi utama
    "TotRmsAbvGrd",   # Total kamar di atas tanah
    "Fireplaces",     # Jumlah perapian
    "LotArea"         # Luas tanah (sq ft)
]

CATEGORICAL_FEATURES = [
    "Neighborhood",   # Kawasan di kota Ames
    "BldgType"        # Tipe bangunan rumah (1Fam, TwnhsE, dll)
]

TARGET = "SalePrice"
ALL_FEATURES = NUMERIC_FEATURES + CATEGORICAL_FEATURES

# Filter dataframe
data = df[ALL_FEATURES + [TARGET]].copy()

# 3. Analisis EDA & Statistik Ringkasan untuk Dashboard Overview
print("--> Menghitung statistik ringkasan EDA...")
eda_summary = {
    "total_records": len(df),
    "features_count": len(ALL_FEATURES),
    "price_stats": {
        "mean": float(data[TARGET].mean()),
        "std": float(data[TARGET].std()),
        "min": float(data[TARGET].min()),
        "q25": float(data[TARGET].quantile(0.25)),
        "median": float(data[TARGET].median()),
        "q75": float(data[TARGET].quantile(0.75)),
        "max": float(data[TARGET].max())
    },
    "neighborhood_averages": (
        data.groupby("Neighborhood")[TARGET]
        .agg(["count", "mean", "median"])
        .reset_index()
        .rename(columns={"count": "sample_count", "mean": "avg_price", "median": "median_price"})
        .sort_values(by="median_price", ascending=False)
        .to_dict(orient="records")
    ),
    "quality_price_distribution": (
        data.groupby("OverallQual")[TARGET]
        .agg(["count", "mean", "median"])
        .reset_index()
        .rename(columns={"count": "sample_count", "mean": "avg_price", "median": "median_price"})
        .to_dict(orient="records")
    ),
    "price_histogram": {
        "bins": [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000, 755000],
        "counts": [
            int(c) for c in pd.cut(
                data[TARGET],
                bins=[50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000, 755000]
            ).value_counts(sort=False).values
        ]
    }
}

# Simpan eda_summary
with open(os.path.join(ARTIFACTS_DIR, "dataset_summary.json"), "w", encoding="utf-8") as f:
    json.dump(eda_summary, f, indent=2)
print("--> dataset_summary.json tersimpan.")

# 4. Train-Test Split
X = data[ALL_FEATURES]
y = data[TARGET]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"Train samples: {len(X_train)}, Test samples: {len(X_test)}")

# 5. Preprocessing Pipeline
numeric_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="median"))
])

categorical_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
])

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, NUMERIC_FEATURES),
        ("cat", categorical_transformer, CATEGORICAL_FEATURES)
    ]
)

# Fit preprocessor
X_train_transformed = preprocessor.fit_transform(X_train)
X_test_transformed = preprocessor.transform(X_test)

# Ambil nama fitur yang telah di-transformasi
ohe_feature_names = preprocessor.named_transformers_["cat"].named_steps["onehot"].get_feature_names_out(CATEGORICAL_FEATURES)
transformed_feature_names = NUMERIC_FEATURES + list(ohe_feature_names)

print(f"Total fitur setelah transformasi OHE: {len(transformed_feature_names)}")

# 6. Model Training & Comparison
# Model A: GradientBoostingRegressor
gbr = GradientBoostingRegressor(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=4,
    random_state=42
)
gbr.fit(X_train_transformed, y_train)
y_pred_gbr = gbr.predict(X_test_transformed)
r2_gbr = r2_score(y_test, y_pred_gbr)
rmse_gbr = np.sqrt(mean_squared_error(y_test, y_pred_gbr))
mae_gbr = mean_absolute_error(y_test, y_pred_gbr)

# Model B: XGBoost Regressor
xgb_reg = xgb.XGBRegressor(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=4,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)
xgb_reg.fit(X_train_transformed, y_train)
y_pred_xgb = xgb_reg.predict(X_test_transformed)
r2_xgb = r2_score(y_test, y_pred_xgb)
rmse_xgb = np.sqrt(mean_squared_error(y_test, y_pred_xgb))
mae_xgb = mean_absolute_error(y_test, y_pred_xgb)

print("\n=== HASIL EVALUASI MODEL ===")
print(f"Gradient Boosting -> R²: {r2_gbr:.4f} | RMSE: ${rmse_gbr:,.2f} | MAE: ${mae_gbr:,.2f}")
print(f"XGBoost Regressor -> R²: {r2_xgb:.4f} | RMSE: ${rmse_xgb:,.2f} | MAE: ${mae_xgb:,.2f}")

# Pilih model terbaik
if r2_xgb >= r2_gbr:
    best_model = xgb_reg
    best_model_name = "XGBoost Regressor"
    best_metrics = {"r2": float(r2_xgb), "rmse": float(rmse_xgb), "mae": float(mae_xgb)}
else:
    best_model = gbr
    best_model_name = "Gradient Boosting Regressor"
    best_metrics = {"r2": float(r2_gbr), "rmse": float(rmse_gbr), "mae": float(mae_gbr)}

print(f"Model terpilih: {best_model_name}")

# 7. SHAP TreeExplainer
print("\n--> Menginisialisasi SHAP TreeExplainer...")
explainer = shap.TreeExplainer(best_model)

# Hitung SHAP values untuk test set guna mendapatkan Global Feature Importance
shap_test_values = explainer.shap_values(X_test_transformed)
mean_abs_shap = np.mean(np.abs(shap_test_values), axis=0)

# Petakan fitur OHE kembali ke fitur induk asli untuk agregasi global importance
grouped_importance = {}
for name, val in zip(transformed_feature_names, mean_abs_shap):
    # Cek apakah fitur turunan kategori
    parent_feature = name
    for cat in CATEGORICAL_FEATURES:
        if name.startswith(f"{cat}_"):
            parent_feature = cat
            break
    grouped_importance[parent_feature] = grouped_importance.get(parent_feature, 0.0) + float(val)

sorted_importance = sorted(
    [{"feature": k, "mean_abs_shap": round(v, 2)} for k, v in grouped_importance.items()],
    key=lambda x: x["mean_abs_shap"],
    reverse=True
)

base_value = float(explainer.expected_value)
if isinstance(base_value, (list, np.ndarray)):
    base_value = float(base_value[0])

print(f"SHAP Base Value (Rata-rata harga dasar): ${base_value:,.2f}")
print("Top 5 Global Feature Importance:")
for item in sorted_importance[:5]:
    print(f"  - {item['feature']}: ${item['mean_abs_shap']:,.2f}")

# 8. Ekspor Artifacts (.joblib & metadata)
print("\n--> Menyimpan artefak model...")
joblib.dump(best_model, os.path.join(ARTIFACTS_DIR, "model.joblib"))
joblib.dump(preprocessor, os.path.join(ARTIFACTS_DIR, "preprocessor.joblib"))
joblib.dump(explainer, os.path.join(ARTIFACTS_DIR, "explainer.joblib"))

# 9. metadata.json (Skema, batas nilai, opsi, deskripsi, preset houses)
feature_schema = {
    "OverallQual": {
        "label": "Overall Quality",
        "label_id": "Kualitas Keseluruhan",
        "type": "integer",
        "min": 1,
        "max": 10,
        "default": 6,
        "step": 1,
        "unit": "skala 1-10",
        "description": "Menilai kualitas material dan finishing keseluruhan rumah (1 = Buruk, 10 = Sangat Mewah)"
    },
    "GrLivArea": {
        "label": "Living Area",
        "label_id": "Luas Bangunan",
        "type": "integer",
        "min": 300,
        "max": 4500,
        "default": 1500,
        "step": 25,
        "unit": "sq ft (~139 m²)",
        "description": "Luas lantai ruang tinggal di atas permukaan tanah (dalam square feet)"
    },
    "TotalBsmtSF": {
        "label": "Basement Area",
        "label_id": "Luas Basement",
        "type": "integer",
        "min": 0,
        "max": 3000,
        "default": 1000,
        "step": 25,
        "unit": "sq ft (~93 m²)",
        "description": "Total luas area ruang bawah tanah (basement)"
    },
    "GarageCars": {
        "label": "Garage Capacity",
        "label_id": "Kapasitas Garasi",
        "type": "integer",
        "min": 0,
        "max": 4,
        "default": 2,
        "step": 1,
        "unit": "mobil",
        "description": "Kapasitas parkir mobil di dalam garasi tertutup"
    },
    "YearBuilt": {
        "label": "Year Built",
        "label_id": "Tahun Dibangun",
        "type": "integer",
        "min": 1880,
        "max": 2010,
        "default": 1985,
        "step": 1,
        "unit": "tahun",
        "description": "Tahun awal saat konstruksi rumah diselesaikan"
    },
    "YearRemodAdd": {
        "label": "Remodel Year",
        "label_id": "Tahun Renovasi",
        "type": "integer",
        "min": 1950,
        "max": 2010,
        "default": 1995,
        "step": 1,
        "unit": "tahun",
        "description": "Tahun renovasi besar terakhir (sama dengan tahun bangun jika belum pernah renovasi)"
    },
    "FullBath": {
        "label": "Full Bathrooms",
        "label_id": "Kamar Mandi Lengkap",
        "type": "integer",
        "min": 0,
        "max": 4,
        "default": 2,
        "step": 1,
        "unit": "ruangan",
        "description": "Jumlah kamar mandi lengkap dengan bak/shower di atas tanah"
    },
    "TotRmsAbvGrd": {
        "label": "Total Rooms",
        "label_id": "Total Kamar",
        "type": "integer",
        "min": 2,
        "max": 14,
        "default": 6,
        "step": 1,
        "unit": "ruangan",
        "description": "Total seluruh ruangan di atas tanah (tidak termasuk kamar mandi)"
    },
    "Fireplaces": {
        "label": "Fireplaces",
        "label_id": "Perapian",
        "type": "integer",
        "min": 0,
        "max": 4,
        "default": 1,
        "step": 1,
        "unit": "unit",
        "description": "Jumlah tungku perapian di dalam rumah"
    },
    "LotArea": {
        "label": "Lot Area",
        "label_id": "Luas Tanah",
        "type": "integer",
        "min": 1300,
        "max": 50000,
        "default": 9500,
        "step": 100,
        "unit": "sq ft (~880 m²)",
        "description": "Total luas kavling tanah properti"
    },
    "Neighborhood": {
        "label": "Neighborhood",
        "label_id": "Kawasan / Lingkungan",
        "type": "category",
        "options": sorted(data["Neighborhood"].unique().tolist()),
        "default": "CollgCr",
        "description": "Kawasan permukiman di wilayah kota Ames, Iowa"
    },
    "BldgType": {
        "label": "Building Type",
        "label_id": "Tipe Bangunan",
        "type": "category",
        "options": [
            {"value": "1Fam", "label": "Single-family Detached (Rumah Tunggal Mandiri)"},
            {"value": "2fmCon", "label": "Two-Family Conversion (Konversi Dua Keluarga)"},
            {"value": "Duplex", "label": "Duplex (Rumah Gandeng 2 Unit)"},
            {"value": "TwnhsE", "label": "Townhouse End Unit (Unit Sudut Townhouse)"},
            {"value": "Twnhs", "label": "Townhouse Inside Unit (Unit Tengah Townhouse)"}
        ],
        "default": "1Fam",
        "description": "Kategori struktur arsitektur hunian"
    }
}

# 4 Contoh Preset Rumah Nyata
preset_houses = [
    {
        "id": "luxury_estate",
        "name": "Modern Luxury Estate",
        "tag": "Mewah & Luas",
        "features": {
            "OverallQual": 9,
            "GrLivArea": 2850,
            "TotalBsmtSF": 1800,
            "GarageCars": 3,
            "YearBuilt": 2006,
            "YearRemodAdd": 2007,
            "FullBath": 3,
            "TotRmsAbvGrd": 10,
            "Fireplaces": 2,
            "LotArea": 14500,
            "Neighborhood": "NoRidge",
            "BldgType": "1Fam"
        }
    },
    {
        "id": "suburban_family",
        "name": "Suburban Family Home",
        "tag": "Populer & Nyaman",
        "features": {
            "OverallQual": 7,
            "GrLivArea": 1650,
            "TotalBsmtSF": 1050,
            "GarageCars": 2,
            "YearBuilt": 1998,
            "YearRemodAdd": 2003,
            "FullBath": 2,
            "TotRmsAbvGrd": 7,
            "Fireplaces": 1,
            "LotArea": 9600,
            "Neighborhood": "CollgCr",
            "BldgType": "1Fam"
        }
    },
    {
        "id": "cozy_starter",
        "name": "Cozy Starter Cottage",
        "tag": "Ekonomis & Kompak",
        "features": {
            "OverallQual": 5,
            "GrLivArea": 980,
            "TotalBsmtSF": 850,
            "GarageCars": 1,
            "YearBuilt": 1960,
            "YearRemodAdd": 1970,
            "FullBath": 1,
            "TotRmsAbvGrd": 5,
            "Fireplaces": 0,
            "LotArea": 7200,
            "Neighborhood": "OldTown",
            "BldgType": "1Fam"
        }
    },
    {
        "id": "townhouse_modern",
        "name": "Modern Urban Townhouse",
        "tag": "Praktis & Terawat",
        "features": {
            "OverallQual": 8,
            "GrLivArea": 1450,
            "TotalBsmtSF": 1200,
            "GarageCars": 2,
            "YearBuilt": 2005,
            "YearRemodAdd": 2006,
            "FullBath": 2,
            "TotRmsAbvGrd": 6,
            "Fireplaces": 1,
            "LotArea": 4200,
            "Neighborhood": "Somerst",
            "BldgType": "TwnhsE"
        }
    }
]

metadata = {
    "model_name": best_model_name,
    "metrics": best_metrics,
    "base_value": base_value,
    "transformed_feature_names": transformed_feature_names,
    "numeric_features": NUMERIC_FEATURES,
    "categorical_features": CATEGORICAL_FEATURES,
    "global_feature_importance": sorted_importance,
    "feature_schema": feature_schema,
    "preset_houses": preset_houses
}

with open(os.path.join(ARTIFACTS_DIR, "metadata.json"), "w", encoding="utf-8") as f:
    json.dump(metadata, f, indent=2)

print("--> metadata.json tersimpan.")
print("\n[SELESAI] Pipeline pelatihan dan SHAP Explainer sukses!")
