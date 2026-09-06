import React, { useEffect } from 'react';
import { X, Database, MapPin, Award } from 'lucide-react';

export default function DatasetOverviewModal({ isOpen, onClose, datasetStats, t }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !datasetStats) return null;

  const {
    total_records = 1460,
    price_stats = {},
    neighborhood_averages = [],
    quality_price_distribution = []
  } = datasetStats;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div className="modal-dialog-3d" onClick={(e) => e.stopPropagation()}>
        <button
          id="btn-close-modal"
          className="modal-close-3d"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <Database size={22} />
          <div>
            <h2 id="modal-headline" style={{ fontSize: '1.45rem' }}>
              {t.modal.title}
            </h2>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              {t.modal.subtitle}
            </div>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">{t.modal.totalSamples}</div>
            <div className="kpi-val">{total_records.toLocaleString()}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Ames, Iowa</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">{t.modal.medianPrice}</div>
            <div className="kpi-val">
              ${price_stats.median?.toLocaleString() || '---'}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>50th Percentile</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">{t.modal.meanPrice}</div>
            <div className="kpi-val">
              ${price_stats.mean?.toLocaleString('en-US', { maximumFractionDigits: 0 }) || '---'}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Std: ${price_stats.std?.toLocaleString('en-US', { maximumFractionDigits: 0 }) || '---'}
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">{t.modal.priceRange}</div>
            <div className="kpi-val" style={{ fontSize: '1.25rem' }}>
              ${price_stats.min?.toLocaleString()} - ${price_stats.max?.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Q25: ${price_stats.q25?.toLocaleString()} | Q75: ${price_stats.q75?.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Neighborhood Table */}
        <div style={{ marginTop: '1.75rem' }}>
          <h3 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <MapPin size={16} /> {t.modal.tableNeighborhood}
          </h3>
          <div className="table-wrap">
            <table className="mono-table">
              <thead>
                <tr>
                  <th>{t.modal.colRank}</th>
                  <th>{t.modal.colNeighborhood}</th>
                  <th>{t.modal.colSamples}</th>
                  <th>{t.modal.colAvg}</th>
                  <th>{t.modal.colMedian}</th>
                </tr>
              </thead>
              <tbody>
                {neighborhood_averages.map((item, idx) => (
                  <tr key={item.Neighborhood}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>#{idx + 1}</td>
                    <td style={{ fontWeight: 700 }}>{item.Neighborhood}</td>
                    <td>{item.sample_count}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>
                      ${item.avg_price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      ${item.median_price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quality vs Price Table */}
        <div style={{ marginTop: '1.75rem' }}>
          <h3 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <Award size={16} /> {t.modal.tableQuality}
          </h3>
          <div className="table-wrap">
            <table className="mono-table">
              <thead>
                <tr>
                  <th>{t.modal.colQuality}</th>
                  <th>{t.modal.colSamples}</th>
                  <th>{t.modal.colAvg}</th>
                  <th>{t.modal.colMedian}</th>
                </tr>
              </thead>
              <tbody>
                {quality_price_distribution.map((item) => (
                  <tr key={item.OverallQual}>
                    <td>★ {item.OverallQual} / 10</td>
                    <td>{item.sample_count}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>
                      ${item.avg_price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      ${item.median_price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
