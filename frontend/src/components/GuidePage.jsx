import React, { useState } from 'react';
import {
  BookOpen,
  ArrowLeft,
  Lightbulb,
  Receipt,
  HelpCircle,
  Building2,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function GuidePage({ onBackToDashboard, t }) {
  const g = t.guide;
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="guide-page-container">
      {/* Top Bar with Back Button */}
      <div className="guide-top-actions">
        <button
          type="button"
          className="btn-toggle-3d"
          onClick={onBackToDashboard}
          id="btn-back-to-dashboard-top"
          style={{ padding: '0.65rem 1.15rem' }}
        >
          <ArrowLeft size={16} />
          <span>{t.nav.backToDashboard}</span>
        </button>

        <span className="badge-tag-mono" style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}>
          {g.badge}
        </span>
      </div>

      {/* Guide Hero */}
      <header className="guide-hero-banner">
        <div className="guide-icon-badge">
          <BookOpen size={28} />
        </div>
        <h1 className="guide-hero-title">{g.title}</h1>
        <p className="guide-hero-desc">{g.subtitle}</p>
      </header>

      {/* =========================================================================
          SECTION 1: How AI Predicts House Prices
          ========================================================================= */}
      <section className="guide-card-3d">
        <div className="guide-section-meta">
          <span className="step-badge-3d">{g.sec1_badge}</span>
          <h2 className="guide-card-heading">{g.sec1_title}</h2>
        </div>

        <p className="guide-body-text">{g.sec1_text}</p>

        <div className="guide-comparison-grid">
          <div className="comp-box">
            <div className="comp-badge">Cara Tradisional</div>
            <h4 style={{ fontSize: '1.05rem', margin: '0.5rem 0' }}>Perkiraan Manual Sederhana</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Mengandalkan intuisi atau rumus kaku (misal: luas x harga per meter). Sering melewatkan kombinasi kompleks seperti pengaruh usia konstruksi terhadap nilai lokasi.
            </p>
          </div>

          <div className="comp-box highlighted">
            <div className="comp-badge" style={{ background: 'var(--text-primary)', color: 'var(--text-inverse)' }}>
              Kecerdasan Buatan (Gradient Boosting)
            </div>
            <h4 style={{ fontSize: '1.05rem', margin: '0.5rem 0' }}>Analisis 1.460 Pola Nyata</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Membangun ratusan pohon keputusan statistik yang saling mengoreksi kesalahan. Mempertimbangkan sinergi 12 variabel sekaligus dengan akurasi 91.7% R².
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: The Black Box Problem & SHAP Solution
          ========================================================================= */}
      <section className="guide-card-3d">
        <div className="guide-section-meta">
          <span className="step-badge-3d">{g.sec2_badge}</span>
          <h2 className="guide-card-heading">{g.sec2_title}</h2>
        </div>

        <div className="analogy-banner">
          <div className="analogy-header">
            <Lightbulb size={20} />
            <span>{g.sec2_analogy_title}</span>
          </div>
          <p className="guide-body-text" style={{ margin: '0.5rem 0' }}>{g.sec2_p1}</p>
          <p className="guide-body-text" style={{ margin: '0.5rem 0' }}>{g.sec2_p2}</p>
        </div>

        {/* Breakdown Points Grid */}
        <div className="points-4-grid">
          {g.sec2_points.map((pt, i) => (
            <div key={i} className="point-card">
              <div className="point-number">0{i + 1}</div>
              <h4 className="point-title">{pt.label}</h4>
              <p className="point-desc">{pt.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: Plain-Language Glossary of 12 Features
          ========================================================================= */}
      <section className="guide-card-3d">
        <div className="guide-section-meta">
          <span className="step-badge-3d">{g.sec3_badge}</span>
          <h2 className="guide-card-heading">{g.sec3_title}</h2>
        </div>

        <div className="glossary-grid">
          {g.glossary.map((item, idx) => (
            <div key={idx} className="glossary-item-card">
              <div className="glossary-header">
                <span className="glossary-term">{item.term}</span>
                <span className="glossary-tag">{item.tag}</span>
              </div>
              <p className="glossary-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: Frequently Asked Questions (FAQ)
          ========================================================================= */}
      <section className="guide-card-3d">
        <div className="guide-section-meta">
          <span className="step-badge-3d">{g.faq_badge}</span>
          <h2 className="guide-card-heading">{g.faq_title}</h2>
        </div>

        <div className="faq-accordion-list">
          {g.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className={`faq-card-item ${isOpen ? 'active' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {isOpen && (
                  <div className="faq-answer-pane">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: Call to Action Banner
          ========================================================================= */}
      <div className="guide-cta-banner">
        <div>
          <h3 className="cta-headline">{g.cta_title}</h3>
          <p className="cta-sub">{g.cta_desc}</p>
        </div>
        <button
          type="button"
          className="btn-calc-3d"
          onClick={onBackToDashboard}
          id="btn-back-to-dashboard-bottom"
          style={{ width: 'auto', padding: '1rem 2rem', margin: 0 }}
        >
          <span>{g.cta_btn}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
