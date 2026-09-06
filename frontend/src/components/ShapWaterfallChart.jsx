import React, { useState } from 'react';
import { Layers, Activity } from 'lucide-react';

export default function ShapWaterfallChart({ contributions = [], basePrice = 181442, predictedPrice = 0, t }) {
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'positive', 'negative'

  if (!contributions || contributions.length === 0) return null;

  const filtered = contributions.filter((c) => {
    if (filterMode === 'positive') return c.direction === 'positive';
    if (filterMode === 'negative') return c.direction === 'negative';
    return true;
  });

  const maxImpact = Math.max(...contributions.map((c) => Math.abs(c.shap_value)), 1000);

  return (
    <div className="shap-fullwidth-card" id="shap-waterfall-card">
      <div className="shap-controls-row">
        <div>
          <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={20} />
            <span>{t.shap.title}</span>
          </h3>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            {t.shap.desc}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-pills-group" role="group" aria-label="SHAP filter mode">
          <button
            type="button"
            className={`btn-filter-pill ${filterMode === 'all' ? 'active' : ''}`}
            onClick={() => setFilterMode('all')}
          >
            {t.shap.filterAll} ({contributions.length})
          </button>
          <button
            type="button"
            className={`btn-filter-pill ${filterMode === 'positive' ? 'active' : ''}`}
            onClick={() => setFilterMode('positive')}
          >
            {t.shap.filterPos}
          </button>
          <button
            type="button"
            className={`btn-filter-pill ${filterMode === 'negative' ? 'active' : ''}`}
            onClick={() => setFilterMode('negative')}
          >
            {t.shap.filterNeg}
          </button>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{ width: '12px', height: '12px', background: 'var(--text-primary)', borderRadius: '3px' }}></span>
          <span>{t.shap.legendPos}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{ width: '12px', height: '12px', background: 'var(--border-subtle)', border: '1px dashed var(--border-strong)', borderRadius: '3px' }}></span>
          <span>{t.shap.legendNeg}</span>
        </div>
      </div>

      {/* Waterfall Rows */}
      <div className="shap-rows-wrapper" role="list">
        {filtered.map((item) => {
          const absVal = Math.abs(item.shap_value);
          const barWidth = Math.min(100, Math.max(5, (absVal / maxImpact) * 100));
          const isPos = item.direction === 'positive';

          return (
            <div
              key={item.feature_key}
              className="shap-row-item"
              role="listitem"
              title={item.impact_text}
            >
              <div className="shap-feat-meta">
                <span className="shap-feat-name">
                  {t.features?.[item.feature_key] || item.feature_label}
                </span>
                <span className="shap-feat-val">
                  {t.shap.inputVal}: <strong>{item.unit_key && t.units?.[item.unit_key] ? `${item.raw_val || item.feature_value} ${t.units[item.unit_key]}` : String(item.feature_value)}</strong>
                </span>
              </div>

              <div className="shap-bar-track">
                <div
                  className={`shap-bar-fill ${isPos ? 'pos' : 'neg'}`}
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>

              <div className={`shap-impact-badge-3d ${isPos ? 'pos' : 'neg'}`}>
                {item.formatted_shap}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
