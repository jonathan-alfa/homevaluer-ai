import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function GlobalImportanceCard({ globalImportance = [], t }) {
  if (!globalImportance || globalImportance.length === 0) return null;

  const FEATURE_NAMES_FALLBACK = {
    OverallQual: 'Kualitas Keseluruhan (Overall Quality)',
    GrLivArea: 'Luas Ruang Tinggal (Living Area)',
    TotalBsmtSF: 'Luas Basement (Basement Area)',
    YearBuilt: 'Tahun Dibangun (Year Built)',
    GarageCars: 'Kapasitas Garasi (Garage Capacity)',
    Neighborhood: 'Kawasan / Lokasi (Neighborhood)',
    LotArea: 'Luas Tanah (Lot Area)',
    YearRemodAdd: 'Tahun Renovasi (Year Remodeled)',
    Fireplaces: 'Jumlah Perapian (Fireplaces)',
    FullBath: 'Kamar Mandi Lengkap (Full Bathrooms)',
    TotRmsAbvGrd: 'Total Kamar (Total Rooms)',
    BldgType: 'Tipe Bangunan (Building Type)'
  };

  return (
    <div className="importance-fullwidth-card" id="global-importance-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
        <BarChart3 size={20} />
        <div>
          <h3 style={{ fontSize: '1.25rem' }}>{t.importance.title}</h3>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
            {t.importance.desc}
          </div>
        </div>
      </div>

      <div className="importance-grid">
        {globalImportance.map((item, idx) => {
          const label = item.label || FEATURE_NAMES_FALLBACK[item.feature] || item.feature || `Fitur #${idx + 1}`;
          const pct = Number(item.importance_pct ?? item.relative_pct ?? 0);
          const meanShap = Number(item.mean_abs_shap || 0);

          return (
            <div key={item.feature || idx} className="imp-row">
              <div className="imp-meta-row">
                <span className="imp-label">
                  #{idx + 1}. {label}
                </span>
                <span className="imp-stat">
                  {t.importance.avgImpact}: <strong>${meanShap.toLocaleString()}</strong> ({pct.toFixed(1)}%)
                </span>
              </div>
              <div className="imp-rail">
                <div
                  className="imp-fill"
                  style={{ width: `${Math.min(100, Math.max(6, pct * 2.8))}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
