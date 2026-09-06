import React from 'react';
import { Home, Database, Sun, Moon, BookOpen, ArrowLeft } from 'lucide-react';

export default function Navbar({
  onOpenStatsModal,
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
  currentPage = 'dashboard',
  onNavigateGuide,
  onNavigateDashboard,
  fxRate,
  t
}) {
  return (
    <header className="navbar-wrap" role="banner">
      <div
        className="brand-group"
        onClick={onNavigateDashboard}
        style={{ cursor: 'pointer' }}
        title="HomeValuer AI"
      >
        <div className="brand-icon-3d" aria-hidden="true">
          <Home size={24} strokeWidth={2.4} />
        </div>
        <div>
          <div className="brand-headline">
            <span>{t.nav.brand}</span>
            <span className="badge-tag-mono">{t.nav.badge}</span>
          </div>
          <div className="brand-subtext">{t.nav.subtitle}</div>
        </div>
      </div>

      <div className="nav-controls">
        {/* Live Currency Rate Indicator Chip */}
        {fxRate > 0 && (
          <div
            className="live-fx-chip"
            title="Kurs USD ke IDR pasar terbuka real-time (diperbarui otomatis)"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.42rem 0.8rem',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981'
              }}
            />
            <span>1 USD ≈ Rp {Math.round(fxRate).toLocaleString('id-ID')}</span>
          </div>
        )}

        {/* Navigation Switch Button (Guide <-> Dashboard) */}

        {currentPage === 'guide' ? (
          <button
            id="btn-nav-back-to-dashboard"
            type="button"
            className="btn-toggle-3d"
            style={{ fontWeight: 700, borderColor: 'var(--text-primary)' }}
            onClick={onNavigateDashboard}
            aria-label={t.nav.backToDashboard}
          >
            <ArrowLeft size={15} />
            <span>{t.nav.backToDashboard}</span>
          </button>
        ) : (
          <button
            id="btn-open-guide"
            type="button"
            className="btn-toggle-3d"
            style={{ fontWeight: 700, background: 'var(--bg-surface-elevated)' }}
            onClick={onNavigateGuide}
            aria-label={t.nav.guideBtn}
          >
            <BookOpen size={15} />
            <span>{t.nav.guideBtn}</span>
          </button>
        )}

        {/* Language Switcher (ID | EN) */}
        <div className="lang-switch-wrap" role="group" aria-label="Language Switcher">
          <button
            type="button"
            className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
            onClick={() => onToggleLang('id')}
            title="Bahasa Indonesia"
          >
            ID
          </button>
          <button
            type="button"
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => onToggleLang('en')}
            title="English"
          >
            EN
          </button>
        </div>

        {/* Theme Toggle (Light / Dark Mode) */}
        <button
          id="btn-theme-toggle"
          type="button"
          className="btn-toggle-3d"
          onClick={onToggleTheme}
          title={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
          aria-label={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          <span>{theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}</span>
        </button>

        {/* Open Stats Modal Button (only shown on dashboard) */}
        {currentPage === 'dashboard' && (
          <button
            id="btn-open-dataset-stats"
            type="button"
            className="btn-toggle-3d"
            onClick={onOpenStatsModal}
            aria-label={t.nav.statsBtn}
          >
            <Database size={15} />
            <span>{t.nav.statsBtn}</span>
          </button>
        )}
      </div>
    </header>
  );
}
