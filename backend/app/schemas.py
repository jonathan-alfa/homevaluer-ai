from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class HouseFeaturesInput(BaseModel):
    OverallQual: int = Field(default=7, ge=1, le=10, description="Kualitas keseluruhan material dan finishing (1-10)")
    GrLivArea: int = Field(default=1700, ge=300, le=5000, description="Luas lantai tinggal di atas tanah (sq ft)")
    TotalBsmtSF: int = Field(default=1000, ge=0, le=3500, description="Luas area basement (sq ft)")
    GarageCars: int = Field(default=2, ge=0, le=5, description="Kapasitas parkir mobil di garasi")
    YearBuilt: int = Field(default=1995, ge=1870, le=2025, description="Tahun awal pembangunan rumah")
    YearRemodAdd: int = Field(default=2002, ge=1950, le=2025, description="Tahun renovasi besar terakhir")
    FullBath: int = Field(default=2, ge=0, le=5, description="Jumlah kamar mandi lengkap")
    TotRmsAbvGrd: int = Field(default=7, ge=2, le=15, description="Total kamar di atas tanah")
    Fireplaces: int = Field(default=1, ge=0, le=4, description="Jumlah perapian")
    LotArea: int = Field(default=9500, ge=1000, le=60000, description="Luas kavling tanah (sq ft)")
    Neighborhood: str = Field(default="CollgCr", description="Kawasan permukiman di Ames, Iowa")
    BldgType: str = Field(default="1Fam", description="Tipe hunian (1Fam, 2fmCon, Duplex, TwnhsE, Twnhs)")

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "OverallQual": 8,
                "GrLivArea": 2100,
                "TotalBsmtSF": 1150,
                "GarageCars": 2,
                "YearBuilt": 2002,
                "YearRemodAdd": 2005,
                "FullBath": 2,
                "TotRmsAbvGrd": 7,
                "Fireplaces": 1,
                "LotArea": 10200,
                "Neighborhood": "CollgCr",
                "BldgType": "1Fam"
            }
        }

class ShapContribution(BaseModel):
    feature_key: str
    feature_label: str
    feature_value: Any
    shap_value: float
    direction: str  # "positive" atau "negative"
    formatted_shap: str
    impact_text: str

class PredictionResponse(BaseModel):
    predicted_price: float
    predicted_price_idr: float
    base_price: float
    base_price_idr: float
    price_difference: float
    price_difference_pct: float
    model_name: str
    r2_score: float
    shap_contributions: List[ShapContribution]
    narrative_summary_id: str
    narrative_summary_en: str
    top_positive_factors: List[str]
    top_negative_factors: List[str]
    usd_to_idr_rate: float = 17650.0
    rate_source: str = "Live Market Exchange Rate"

class FeatureImportanceItem(BaseModel):
    feature: str
    label: str
    mean_abs_shap: float
    importance_pct: float

class FeatureImportanceResponse(BaseModel):
    model_name: str
    metrics: Dict[str, float]
    base_value: float
    global_importance: List[FeatureImportanceItem]

class PresetHouse(BaseModel):
    id: str
    name: str
    tag: str
    features: Dict[str, Any]
