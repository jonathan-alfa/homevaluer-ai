import React from 'react';
import { Bot, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function ShapExplanationNarrative({ narrativeId, narrativeEn, positiveFactors = [], negativeFactors = [], lang, t }) {
  if (!narrativeId && !narrativeEn) return null;

  const currentNarrative = lang === 'id' ? narrativeId : narrativeEn;

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
        {positiveFactors.map((text, idx) => (
          <div key={`pos-${idx}`} className="factor-item pos">
            <ArrowUpRight size={16} />
            <span>{text}</span>
          </div>
        ))}

        {negativeFactors.map((text, idx) => (
          <div key={`neg-${idx}`} className="factor-item neg">
            <ArrowDownRight size={16} />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
