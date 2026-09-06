import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import IsometricHouse3D from './components/IsometricHouse3D';
import PresetSelector from './components/PresetSelector';
import HouseForm from './components/HouseForm';
import PredictionCard from './components/PredictionCard';
import ShapExplanationNarrative from './components/ShapExplanationNarrative';
import ShapWaterfallChart from './components/ShapWaterfallChart';
import GlobalImportanceCard from './components/GlobalImportanceCard';
import DatasetOverviewModal from './components/DatasetOverviewModal';
import AiLoadingOverlay from './components/AiLoadingOverlay';
import GuidePage from './components/GuidePage';
import { translations } from './i18n/translations';
import {
  fetchHealth,
  explainPrice,
  fetchFeatureImportance,
  fetchDatasetStats,
  fetchPresets,
  fetchSchema
} from './services/api';
import { getLiveExchangeRate } from './services/currencyService';


const INITIAL_HOUSE_FEATURES = {
  OverallQual: 7,
  GrLivArea: 1750,
  TotalBsmtSF: 1100,
  GarageCars: 2,
  YearBuilt: 2002,
  YearRemodAdd: 2005,
  FullBath: 2,
  TotRmsAbvGrd: 7,
  Fireplaces: 1,
  LotArea: 9800,
  Neighborhood: 'CollgCr',
  BldgType: '1Fam'
};

export default function App() {
  // Page Routing State ('dashboard' | 'guide')
  const [currentPage, setCurrentPage] = useState(() => {
    return window.location.hash === '#guide' ? 'guide' : 'dashboard';
  });

  // Theme state ('dark' | 'light')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('homevaluer_theme') || 'dark';
  });

  // Language state ('id' | 'en')
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('homevaluer_lang') || 'id';
  });

  const t = translations[lang] || translations.id;

  // App data states
  const [formData, setFormData] = useState(INITIAL_HOUSE_FEATURES);
  const [predictionResult, setPredictionResult] = useState(null);
  const [presets, setPresets] = useState([]);
  const [activePresetId, setActivePresetId] = useState('suburban_family');
  const [globalImportance, setGlobalImportance] = useState([]);
  const [datasetStats, setDatasetStats] = useState(null);
  const [neighborhoodOptions, setNeighborhoodOptions] = useState([
    'Blmngtn', 'Blueste', 'BrDale', 'BrkSide', 'ClearCr', 'CollgCr', 'Crawfor',
    'Edwards', 'Gilbert', 'IDOTRR', 'MeadowV', 'Mitchel', 'NAmes', 'NPkVill',
    'NWAmes', 'NoRidge', 'NridgHt', 'OldTown', 'SWISU', 'Sawyer', 'SawyerW',
    'Somerst', 'StoneBr', 'Timber', 'Veenker'
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiCalculating, setIsAiCalculating] = useState(false);
  const [isArrivalHighlight, setIsArrivalHighlight] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [fxRate, setFxRate] = useState(17650);

  // Sync theme with HTML document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('homevaluer_theme', theme);
  }, [theme]);

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('homevaluer_lang', lang);
  }, [lang]);

  // Listen to browser hash changes (back/forward button)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#guide') {
        setCurrentPage('guide');
      } else {
        setCurrentPage('dashboard');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLang = (selectedLang) => {
    setLang(selectedLang);
  };

  const navigateToGuide = () => {
    setCurrentPage('guide');
    window.location.hash = 'guide';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initial load
  useEffect(() => {
    async function init() {
      try {
        await fetchHealth().catch(() => null);

        // Ambil kurs valas otomatis terkini
        const liveFx = await getLiveExchangeRate().catch(() => 17650);
        if (liveFx) setFxRate(liveFx);

        const presetData = await fetchPresets().catch(() => []);

        if (presetData && presetData.length > 0) {
          setPresets(presetData);
          const defaultPreset = presetData.find((p) => p.id === 'suburban_family') || presetData[0];
          if (defaultPreset) {
            setFormData(defaultPreset.features);
            setActivePresetId(defaultPreset.id);
            runPrediction(defaultPreset.features, false);
          }
        } else {
          runPrediction(INITIAL_HOUSE_FEATURES, false);
        }

        const impData = await fetchFeatureImportance().catch(() => null);
        if (impData?.global_importance) {
          setGlobalImportance(impData.global_importance);
        }

        const stats = await fetchDatasetStats().catch(() => null);
        if (stats) setDatasetStats(stats);

        const schema = await fetchSchema().catch(() => null);
        if (schema?.Neighborhood?.options) {
          setNeighborhoodOptions(schema.Neighborhood.options);
        }
      } catch (err) {
        console.error('Initialization error:', err);
        runPrediction(INITIAL_HOUSE_FEATURES, false);
      }
    }

    init();
  }, []);

  const runPrediction = async (featuresToPredict, showLoadingScreen = false) => {
    if (showLoadingScreen) {
      setIsAiCalculating(true);
    } else {
      setIsLoading(true);
    }

    try {
      const res = await explainPrice(featuresToPredict);
      if (res?.usd_to_idr_rate) {
        setFxRate(res.usd_to_idr_rate);
      }
      setPredictionResult(res);
    } catch (err) {
      console.error('Prediction failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Callback when AI loading animation sequence completes
  const handleLoadingComplete = () => {
    setIsAiCalculating(false);
    // Smoothly scroll directly to Section 02: Valuation Results!
    setTimeout(() => {
      const target = document.getElementById('section-valuation');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsArrivalHighlight(true);
        setTimeout(() => setIsArrivalHighlight(false), 2400);
      }
    }, 120);
  };

  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
    setFormData(preset.features);
    runPrediction(preset.features, true);
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
    setActivePresetId(null);
  };

  return (
    <div className="app-wrapper">
      {/* 3D Interactive AI Loading Overlay */}
      <AiLoadingOverlay
        isOpen={isAiCalculating}
        onComplete={handleLoadingComplete}
        t={t}
      />

      {/* Navigation Header */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
        onOpenStatsModal={() => setIsStatsModalOpen(true)}
        currentPage={currentPage}
        onNavigateGuide={navigateToGuide}
        onNavigateDashboard={navigateToDashboard}
        fxRate={fxRate}
        t={t}
      />


      {/* MAIN VIEW: EITHER SEPARATE GUIDE PAGE OR FULL DASHBOARD */}
      {currentPage === 'guide' ? (
        <GuidePage
          onBackToDashboard={navigateToDashboard}
          t={t}
        />
      ) : (
        <>
          {/* Hero Section with 3D Isometric Architectural Card */}
          <section className="hero-section" aria-label="Hero Overview">
            <div className="hero-content-col">
              <div className="hero-eyebrow">
                <span>●</span>
                <span>{t.hero.tag}</span>
              </div>
              <h1 className="hero-title">{t.hero.title}</h1>
              <p className="hero-description">{t.hero.desc}</p>
              
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="badge-tag-mono">{t.hero.modelPill}</span>
                <span className="badge-tag-mono">Gradient Boosting (91.7% R²)</span>
                <span className="badge-tag-mono">SHAP TreeExplainer</span>
              </div>

              {/* Call-to-action button to read beginner guide */}
              <div style={{ marginTop: '1.5rem' }}>
                <button
                  id="btn-hero-read-guide"
                  type="button"
                  className="btn-toggle-3d"
                  style={{
                    padding: '0.75rem 1.35rem',
                    fontWeight: 700,
                    borderColor: 'var(--text-primary)',
                    background: 'var(--bg-surface-elevated)'
                  }}
                  onClick={navigateToGuide}
                >
                  <span>{t.hero.readGuideBtn}</span>
                </button>
              </div>
            </div>

            {/* 3D Interactive Isometric Card */}
            <div className="hero-visual-col">
              <IsometricHouse3D formData={formData} t={t} />
            </div>
          </section>

          {/* Presets (1-Click Test Benchmark Profiles) */}
          <PresetSelector
            presets={presets}
            activePresetId={activePresetId}
            onSelectPreset={handleSelectPreset}
            t={t}
          />

          {/* =========================================================================
              VERTICAL FLOW: SECTION 01 - House Feature Configurator Form
              ========================================================================= */}
          <section className="section-wrapper" aria-labelledby="sec1-title">
            <div className="section-header-block">
              <span className="step-badge-3d">{t.sections.s1_badge}</span>
              <h2 id="sec1-title" className="section-main-title">{t.sections.s1_title}</h2>
              <p className="section-lead-text">{t.sections.s1_desc}</p>
            </div>

            <HouseForm
              formData={formData}
              onChange={handleFormChange}
              onSubmit={() => runPrediction(formData, true)}
              isLoading={isLoading || isAiCalculating}
              neighborhoodOptions={neighborhoodOptions}
              t={t}
            />
          </section>

          {/* =========================================================================
              VERTICAL FLOW: SECTION 02 - Valuation Result & AI Narrative Summary
              ========================================================================= */}
          <section
            id="section-valuation"
            className={`section-wrapper ${isArrivalHighlight ? 'target-arrival-highlight' : ''}`}
            aria-labelledby="sec2-title"
          >
            <div className="section-header-block">
              <span className="step-badge-3d">{t.sections.s2_badge}</span>
              <h2 id="sec2-title" className="section-main-title">{t.sections.s2_title}</h2>
              <p className="section-lead-text">{t.sections.s2_desc}</p>
            </div>

            {/* Valuation Result Monumental Card */}
            <PredictionCard
              result={predictionResult}
              isLoading={isLoading}
              t={t}
            />

            {/* AI Smart Narrative Box */}
            {predictionResult && (
              <ShapExplanationNarrative
                narrativeId={predictionResult.narrative_summary_id}
                narrativeEn={predictionResult.narrative_summary_en}
                positiveFactors={predictionResult.top_positive_factors}
                negativeFactors={predictionResult.top_negative_factors}
                lang={lang}
                t={t}
              />
            )}
          </section>

          {/* =========================================================================
              VERTICAL FLOW: SECTION 03 - SHAP Waterfall Decomposition Visualizer
              ========================================================================= */}
          <section className="section-wrapper" aria-labelledby="sec3-title">
            <div className="section-header-block">
              <span className="step-badge-3d">{t.sections.s3_badge}</span>
              <h2 id="sec3-title" className="section-main-title">{t.sections.s3_title}</h2>
              <p className="section-lead-text">{t.sections.s3_desc}</p>
            </div>

            <ShapWaterfallChart
              contributions={predictionResult?.shap_contributions}
              basePrice={predictionResult?.base_price}
              predictedPrice={predictionResult?.predicted_price}
              t={t}
            />
          </section>

          {/* =========================================================================
              VERTICAL FLOW: SECTION 04 - Global Feature Importance
              ========================================================================= */}
          <section className="section-wrapper" aria-labelledby="sec4-title">
            <div className="section-header-block">
              <span className="step-badge-3d">{t.sections.s4_badge}</span>
              <h2 id="sec4-title" className="section-main-title">{t.sections.s4_title}</h2>
              <p className="section-lead-text">{t.sections.s4_desc}</p>
            </div>

            <GlobalImportanceCard
              globalImportance={globalImportance}
              t={t}
            />
          </section>
        </>
      )}

      {/* Dataset Statistics Modal */}
      <DatasetOverviewModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        datasetStats={datasetStats}
        t={t}
      />

      {/* Footer */}
      <footer className="footer-block" role="contentinfo">
        <div>
          <strong>{t.footer.copy}</strong>
        </div>
        <div>
          {t.footer.details}
        </div>
      </footer>
    </div>
  );
}
