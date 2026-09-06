import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function GlobalImportanceCard({ globalImportance = [], t }) {
  if (!globalImportance || globalImportance.length === 0) return null;

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
          return (
            <div key={item.feature} className="imp-row">
              <div className="imp-meta-row">
                <span className="imp-label">
                  #{idx + 1}. {item.label}
                </span>
                <span className="imp-stat">
                  {t.importance.avgImpact}: <strong>${item.mean_abs_shap.toLocaleString()}</strong> ({item.importance_pct}%)
                </span>
              </div>
              <div className="imp-rail">
                <div
                  className="imp-fill"
                  style={{ width: `${Math.min(100, Math.max(6, item.importance_pct * 2.8))}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
