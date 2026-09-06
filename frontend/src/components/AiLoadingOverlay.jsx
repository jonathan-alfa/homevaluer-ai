import React, { useState, useEffect } from 'react';
import { Cpu, Check, Activity, Sparkles, ArrowDown } from 'lucide-react';

export default function AiLoadingOverlay({ isOpen, onComplete, t }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(15);

  const steps = t.loading?.steps || [
    "Memvalidasi 12 parameter fitur properti...",
    "Menjalankan model inferensi Gradient Boosting...",
    "Menghitung dekomposisi kontribusi SHAP TreeExplainer...",
    "Menyusun narasi kecerdasan buatan...",
    "Selesai! Mengarahkan ke hasil valuasi..."
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(15);
      return;
    }

    // Step 0: 0 - 300ms (Progress 25%)
    // Step 1: 300ms - 700ms (Progress 50%)
    // Step 2: 700ms - 1100ms (Progress 75%)
    // Step 3: 1100ms - 1450ms (Progress 90%)
    // Step 4: 1450ms - 1750ms (Progress 100% -> onComplete)

    const timer1 = setTimeout(() => {
      setCurrentStep(1);
      setProgress(45);
    }, 320);

    const timer2 = setTimeout(() => {
      setCurrentStep(2);
      setProgress(70);
    }, 720);

    const timer3 = setTimeout(() => {
      setCurrentStep(3);
      setProgress(90);
    }, 1150);

    const timer4 = setTimeout(() => {
      setCurrentStep(4);
      setProgress(100);
    }, 1450);

    const timerComplete = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1750);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timerComplete);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="loading-overlay-backdrop" role="alert" aria-busy="true" aria-live="assertive">
      <div className="loading-card-3d">
        {/* Animated 3D Wireframe Geometry */}
        <div className="loading-3d-visual">
          <div className="spinner-cube-3d">
            <div className="cube-side side-front">
              <Activity size={24} />
            </div>
            <div className="cube-side side-back"></div>
            <div className="cube-side side-right"></div>
            <div className="cube-side side-left"></div>
            <div className="cube-side side-top"></div>
            <div className="cube-side side-bottom"></div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="loading-text-header">
          <h3 className="loading-title">
            <Sparkles size={18} /> {t.loading?.title || "Menganalisis Properti & Menghitung SHAP"}
          </h3>
          <p className="loading-subtitle">
            {t.loading?.subtitle || "Model Gradient Boosting sedang mengevaluasi 12 parameter fitur..."}
          </p>
        </div>

        {/* Progress Bar with 3D Depth */}
        <div className="loading-progress-rail">
          <div
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="loading-pct-text font-mono">
          {progress}% CALCULATING
        </div>

        {/* Step-by-Step AI Pipeline Status */}
        <div className="loading-steps-list">
          {steps.map((text, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                className={`loading-step-item ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
              >
                <span className="step-icon-circle">
                  {isDone ? (
                    <Check size={12} strokeWidth={3} />
                  ) : isCurrent ? (
                    <span className="step-pulse-dot"></span>
                  ) : (
                    <span className="step-idle-dot"></span>
                  )}
                </span>
                <span className="step-label-text">{text}</span>
              </div>
            );
          })}
        </div>

        {/* Directing Indicator */}
        {currentStep === 4 && (
          <div className="directing-badge">
            <ArrowDown size={14} className="bounce-arrow" />
            <span>{t.loading?.directing || "Mengarahkan ke Hasil Estimasi..."}</span>
          </div>
        )}
      </div>
    </div>
  );
}
