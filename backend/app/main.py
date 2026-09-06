import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from typing import Dict, Any, List

from .schemas import (
    HouseFeaturesInput,
    PredictionResponse,
    FeatureImportanceResponse,
    PresetHouse
)
from .model_service import model_service

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Catatan teknis: Load model sekali saat startup aplikasi
    print("[Startup] Menginisialisasi Model & SHAP Explainer ke memori...")
    try:
        model_service.load_artifacts()
        print("[Startup] Model siap melayani request.")
    except Exception as e:
        print(f"[Startup Error] Gagal memuat artefak model: {e}")
    yield
    print("[Shutdown] Membersihkan resource API.")

app = FastAPI(
    title="House Price Explainable AI API",
    description="REST API Prediksi Harga Rumah berbasis Machine Learning & Explainable AI (SHAP)",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration agar frontend React dapat mengakses API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "House Price Prediction & SHAP API",
        "model_loaded": model_service._is_loaded,
        "base_value": getattr(model_service, "base_value", None)
    }

@app.post("/api/predict", response_model=PredictionResponse)
@app.post("/predict", response_model=PredictionResponse)
def predict_price(features: HouseFeaturesInput):
    """
    Menerima fitur rumah, mengembalikan prediksi harga dan kontribusi SHAP.
    """
    try:
        return model_service.predict_and_explain(features)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memproses prediksi: {str(e)}")

@app.post("/api/explain", response_model=PredictionResponse)
@app.post("/explain", response_model=PredictionResponse)
def explain_prediction(features: HouseFeaturesInput):
    """
    Menerima fitur rumah, mengembalikan nilai SHAP per fitur, arah pengaruh, dan narasi penjelasan cerdas.
    """
    try:
        return model_service.predict_and_explain(features)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memproses explainability SHAP: {str(e)}")

@app.get("/api/feature-importance", response_model=FeatureImportanceResponse)
@app.get("/feature-importance", response_model=FeatureImportanceResponse)
def get_feature_importance():
    """
    Mengembalikan ranking feature importance global (mean absolute SHAP) di seluruh dataset Ames.
    """
    try:
        return model_service.get_global_feature_importance()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memuat feature importance: {str(e)}")

@app.get("/api/dataset-stats")
def get_dataset_stats():
    """
    Mengembalikan ringkasan statistik dataset Ames (distribusi harga, perbandingan neighborhood, kuartil).
    """
    try:
        return model_service.get_dataset_stats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memuat statistik dataset: {str(e)}")

@app.get("/api/presets", response_model=List[PresetHouse])
def get_preset_houses():
    """
    Mengembalikan daftar preset profil rumah contoh untuk pengujian instan.
    """
    try:
        return model_service.get_presets()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memuat preset: {str(e)}")

@app.get("/api/schema")
def get_schema():
    """
    Mengembalikan skema fitur, opsi, nilai default, dan batasan input untuk form frontend.
    """
    try:
        return model_service.get_feature_schema()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memuat skema: {str(e)}")

@app.get("/api/exchange-rate")
def get_exchange_rate():
    """
    Mengembalikan kurs USD ke IDR terkini secara otomatis (live rate pasar valas).
    """
    try:
        rate = model_service.get_current_usd_to_idr_rate()
        return {
            "base_currency": "USD",
            "target_currency": "IDR",
            "rate": rate,
            "formatted": f"1 USD = Rp {rate:,.0f}",
            "source": "Live Open Exchange Rate API"
        }
    except Exception as e:
        return {
            "base_currency": "USD",
            "target_currency": "IDR",
            "rate": 17650.0,
            "formatted": "1 USD = Rp 17.650",
            "source": "Fallback Rate"
        }

# Static frontend serving (untuk All-in-One single URL deployment di Render/Railway)
dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist"))
if os.path.exists(dist_dir) and os.path.exists(os.path.join(dist_dir, "index.html")):
    assets_dir = os.path.join(dist_dir, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="API route not found")
        file_path = os.path.join(dist_dir, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(dist_dir, "index.html"))


