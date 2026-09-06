import sys
import os

# Tambahkan backend ke path
sys.path.insert(0, os.path.dirname(__file__))

from app.model_service import model_service
from app.schemas import HouseFeaturesInput

print("[Test] Memuat ModelService...")
model_service.load_artifacts()

print("\n1. Test Health & Base Value:")
print(f"   Model Name: {model_service.metadata.get('model_name')}")
print(f"   Base Value: ${model_service.base_value:,.2f}")

print("\n2. Test Feature Importance:")
imp = model_service.get_global_feature_importance()
for item in imp.global_importance[:4]:
    print(f"   - {item.label}: ${item.mean_abs_shap:,.2f} ({item.importance_pct:.1f}%)")

print("\n3. Test Predict & Explain:")
sample_input = HouseFeaturesInput(
    OverallQual=8,
    GrLivArea=2100,
    TotalBsmtSF=1200,
    GarageCars=2,
    YearBuilt=2003,
    YearRemodAdd=2004,
    FullBath=2,
    TotRmsAbvGrd=8,
    Fireplaces=1,
    LotArea=10500,
    Neighborhood="CollgCr",
    BldgType="1Fam"
)

res = model_service.predict_and_explain(sample_input)
print(f"   Predicted Price: ${res.predicted_price:,.2f} (Rp {res.predicted_price_idr:,.0f})")
print(f"   Base Price: ${res.base_price:,.2f}")
print(f"   Difference: ${res.price_difference:,.2f} ({res.price_difference_pct:+.1f}%)")
print(f"   Narrative ID: {res.narrative_summary_id}")
print("   SHAP Contributions (Top 3):")
for c in res.shap_contributions[:3]:
    print(f"     * {c.feature_label}: {c.formatted_shap} [{c.direction}]")

print("\n4. Test Dataset Summary Stats:")
stats = model_service.get_dataset_stats()
print(f"   Total records in EDA summary: {stats.get('total_records')}")
print(f"   Median SalePrice in dataset: ${stats.get('price_stats', {}).get('median', 0):,.2f}")

print("\n[SUKSES] Semua pengujian logika backend berhasil!")
