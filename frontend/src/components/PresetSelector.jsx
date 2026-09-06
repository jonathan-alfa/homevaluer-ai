import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PresetSelector({ presets, activePresetId, onSelectPreset, t }) {
  if (!presets || presets.length === 0) return null;

  // Preset labels map to translations if available
  const getPresetLabel = (preset) => {
    if (preset.id === 'luxury_estate' && t.presets.luxury) return t.presets.luxury;
    if (preset.id === 'suburban_family' && t.presets.suburban) return t.presets.suburban;
    if (preset.id === 'cozy_starter' && t.presets.starter) return t.presets.starter;
    if (preset.id === 'townhouse_modern' && t.presets.townhouse) return t.presets.townhouse;
    return { name: preset.name, tag: preset.tag };
  };

  return (
    <section className="presets-container" aria-labelledby="presets-title">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 id="presets-title" style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} /> {t.presets.title}
        </h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {t.presets.subtitle}
        </span>
      </div>

      <div className="presets-grid-3d" role="radiogroup" aria-label={t.presets.title}>
        {presets.map((preset) => {
          const isActive = activePresetId === preset.id;
          const { OverallQual, GrLivArea, YearBuilt, Neighborhood } = preset.features;
          const { name, tag } = getPresetLabel(preset);

          return (
            <button
              key={preset.id}
              id={`preset-${preset.id}`}
              type="button"
              className={`preset-btn-3d ${isActive ? 'active' : ''}`}
              onClick={() => onSelectPreset(preset)}
              role="radio"
              aria-checked={isActive}
            >
              <div className="preset-top-meta">
                <span className="preset-name">{name}</span>
                <span className="preset-tag-mono">{tag}</span>
              </div>
              <div className="preset-attr-line">
                <span>★ {OverallQual}/10</span>
                <span>•</span>
                <span>{GrLivArea} sq ft</span>
                <span>•</span>
                <span>{YearBuilt}</span>
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
                📍 {Neighborhood}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
