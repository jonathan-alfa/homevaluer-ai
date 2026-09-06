import React from 'react';
import { Award, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';

export default function PredictionCard({ result, isLoading, t }) {
  if (!result && !isLoading) return null;

  const {
    predicted_price = 0,
    predicted_price_idr = 0,
    base_price = 181442,
    price_difference = 0,
    price_difference_pct = 0,
    r2_score = 0.9167,
    model_name = "Gradient Boosting Regressor",
    usd_to_idr_rate = 17650
  } = result || {};

  const isAboveBase = price_difference >= 0;

  return (
    <div className="valuation-fullwidth-card" id="valuation-result-card">
      <div className="val-top-meta">
        <div className="val-eyebrow">
          <Award size={16} />
          <span>{t.prediction.cardTag}</span>
        </div>
        <div className="val-accuracy-pill" title="Evaluated on Kaggle Test Set">
          <CheckCircle2 size={13} />
          <span>{t.prediction.confidence}: {(r2_score * 100).toFixed(1)}% R² ({model_name})</span>
        </div>
      </div>

      <div className="price-monumental-wrap">
        <span className="price-currency-sign">$</span>
        <span className="price-giant-number" id="predicted-price-text">
          {predicted_price ? predicted_price.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '---'}
        </span>
      </div>

      <div className="val-idr-sub" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
        <span>≈ Rp {predicted_price_idr ? predicted_price_idr.toLocaleString('id-ID') : '---'}</span>
        <span
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'var(--bg-surface)',
            padding: '0.2rem 0.65rem',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--font-mono)'
          }}
          title="Kurs valas otomatis diperbarui dari pasar global secara berkala"
        >
          <span
            style={{
              display: 'inline-block',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 6px #10b981'
            }}
          />
          <span>
            {t.prediction.liveRatePrefix}Rp {Math.round(usd_to_idr_rate).toLocaleString('id-ID')}/USD
          </span>
        </span>
      </div>


      <div className="val-benchmark-grid">
        <div className="benchmark-box">
          <div className="bench-title">{t.prediction.baseMarket}</div>
          <div className="bench-val" style={{ color: 'var(--text-secondary)' }}>
            ${base_price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="benchmark-box">
          <div className="bench-title">{t.prediction.diffLabel}</div>
          <div className="bench-val" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {isAboveBase ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            <span>
              {isAboveBase ? '+' : ''}${Math.abs(price_difference).toLocaleString('en-US', { maximumFractionDigits: 0 })} ({isAboveBase ? '+' : ''}{price_difference_pct.toFixed(1)}% {isAboveBase ? t.prediction.aboveBase : t.prediction.belowBase})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
