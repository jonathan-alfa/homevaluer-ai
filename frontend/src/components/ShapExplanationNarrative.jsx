import React from 'react';
import { Bot, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function ShapExplanationNarrative({
  narrativeId,
  narrativeEn,
  contributions = [],
  positiveFactors = [],
  negativeFactors = [],
  lang,
  t
}) {
  if (!narrativeId && !narrativeEn) return null;

  const currentNarrative = lang === 'id' ? narrativeId : narrativeEn;

  let posItems = [];
  let negItems = [];

  if (contributions && contributions.length > 0) {
    const topPos = contributions.filter((c) => c.direction === 'positive').slice(0, 3);
    const topNeg = contributions.filter((c) => c.direction === 'negative').slice(0, 3);

    const formatFactor = (c) => {
      const featName = t.features?.[c.feature_key] || c.feature_label || c.feature_key;
      const unit = c.unit_key && t.units?.[c.unit_key] ? ` ${t.units[c.unit_key]}` : '';
      const rawVal = c.raw_val || c.feature_value;
      const valStr = unit ? `${rawVal}${unit}` : `${rawVal}`;
      const verb = c.direction === 'positive' ? t.narrative.increasesValuation : t.narrative.decreasesValuation;
      return `${featName} (${valStr}) ${verb} ${c.formatted_shap}`;
    };

    posItems = topPos.map(formatFactor);
    negItems = topNeg.map(formatFactor);
  } else {
    posItems = positiveFactors;
    negItems = negativeFactors;
  }

  return (
    <div className="narrative-fullwidth-card" id="ai-narrative-card">
      <div className="narrative-head">
        <div className="narrative-title">
          <Bot size={18} />
          <span>{t.narrative.title}</span>
        </div>
      </div>

      <p className="narrative-paragraph">
        {currentNarrative}
      </p>

      <div className="factors-list">
        {posItems.map((text, idx) => (
          <div key={`pos-${idx}`} className="factor-item pos">
            <ArrowUpRight size={16} />
            <span>{text}</span>
          </div>
        ))}

        {negItems.map((text, idx) => (
          <div key={`neg-${idx}`} className="factor-item neg">
            <ArrowDownRight size={16} />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
