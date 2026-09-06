import {
  calculateLocalPrediction,
  LOCAL_PRESETS,
  LOCAL_GLOBAL_IMPORTANCE
} from './localEngine';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Fetch health status of the ML backend
 */
export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('API Health Check Failed');
    return await res.json();
  } catch (err) {
    console.warn('[API] Health check failed, using local engine mode:', err.message);
    return { status: 'offline', local_fallback: true };
  }
}

/**
 * Predict house price and get SHAP contributions.
 * Automatically falls back to high-accuracy local Kaggle Ames Model if backend is offline.
 */
export async function explainPrice(features) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(features),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Prediction failed' }));
      throw new Error(err.detail || 'Prediction failed');
    }

    return await res.json();
  } catch (err) {
    console.warn('[API] Backend unreachable, computing with built-in ML Kaggle engine:', err.message);
    return calculateLocalPrediction(features);
  }
}

/**
 * Fetch global feature importance (SHAP)
 */
export async function fetchFeatureImportance() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/feature-importance`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Failed to load feature importance');
    return await res.json();
  } catch (err) {
    console.warn('[API] Using local global importance data:', err.message);
    return { global_importance: LOCAL_GLOBAL_IMPORTANCE };
  }
}

/**
 * Fetch dataset summary stats for EDA overview
 */
export async function fetchDatasetStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/dataset-stats`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Failed to load dataset stats');
    return await res.json();
  } catch (err) {
    return {
      total_records: 1460,
      features_count: 12,
      price_stats: {
        mean: 180921,
        std: 79442,
        min: 34900,
        median: 163000,
        max: 755000
      },
      neighborhood_averages: [
        { Neighborhood: "NridgHt", sample_count: 77, avg_price: 316270, median_price: 315000 },
        { Neighborhood: "NoRidge", sample_count: 41, avg_price: 335295, median_price: 301500 },
        { Neighborhood: "StoneBr", sample_count: 25, avg_price: 310499, median_price: 278000 },
        { Neighborhood: "Somerst", sample_count: 86, avg_price: 225380, median_price: 225500 },
        { Neighborhood: "CollgCr", sample_count: 150, avg_price: 197965, median_price: 197200 },
        { Neighborhood: "OldTown", sample_count: 113, avg_price: 128641, median_price: 119000 }
      ]
    };
  }
}

/**
 * Fetch preset house configurations
 */
export async function fetchPresets() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/presets`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Failed to load presets');
    return await res.json();
  } catch (err) {
    return LOCAL_PRESETS;
  }
}

/**
 * Fetch feature schema
 */
export async function fetchSchema() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/schema`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Failed to load schema');
    return await res.json();
  } catch (err) {
    return {
      Neighborhood: {
        options: [
          'Blmngtn', 'Blueste', 'BrDale', 'BrkSide', 'ClearCr', 'CollgCr', 'Crawfor',
          'Edwards', 'Gilbert', 'IDOTRR', 'MeadowV', 'Mitchel', 'NAmes', 'NPkVill',
          'NWAmes', 'NoRidge', 'NridgHt', 'OldTown', 'SWISU', 'Sawyer', 'SawyerW',
          'Somerst', 'StoneBr', 'Timber', 'Veenker'
        ]
      }
    };
  }
}
