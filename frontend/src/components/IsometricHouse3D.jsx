import React, { useState, useRef } from 'react';
import { Layers, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function IsometricHouse3D({ formData, t }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 12, y: -18 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Map to subtle tilt (-15deg to +15deg)
    const rotX = -(y / (rect.height / 2)) * 14;
    const rotY = (x / (rect.width / 2)) * 18;
    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 10, y: -16 });
  };

  const {
    OverallQual = 7,
    GrLivArea = 1750,
    YearBuilt = 2002,
    GarageCars = 2,
    Neighborhood = 'CollgCr',
    BldgType = '1Fam'
  } = formData || {};

  return (
    <div
      ref={cardRef}
      className="card-3d isometric-hero-wrap"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="iso-header-badge">
        <span className="iso-live-dot"></span>
        <span>3D Architectural Isometric Spec</span>
      </div>

      {/* 3D Isometric Architectural Geometry */}
      <div className="iso-stage">
        {/* Isometric Grid Floor */}
        <div className="iso-floor-grid"></div>

        {/* 3D House Structure */}
        <div className="iso-cube">
          {/* Top Roof Face */}
          <div className="iso-face iso-roof">
            <div className="roof-ridge"></div>
            <div className="roof-label">★ QUAL: {OverallQual}/10</div>
          </div>

          {/* Front Wall */}
          <div className="iso-face iso-front">
            <div className="iso-door"></div>
            <div className="iso-window win-1"></div>
            <div className="iso-window win-2"></div>
            <div className="iso-wall-tag">{GrLivArea} SQFT</div>
          </div>

          {/* Right Wall */}
          <div className="iso-face iso-right">
            <div className="iso-garage-door">
              <div className="garage-slat"></div>
              <div className="garage-slat"></div>
              <div className="garage-label">{GarageCars} CAR GARAGE</div>
            </div>
            <div className="iso-window win-3"></div>
          </div>
        </div>

        {/* Floating 3D Stat Badges */}
        <div className="iso-floating-badge badge-top">
          <div className="badge-val">⭐ {OverallQual}/10</div>
          <div className="badge-lbl">Material Grade</div>
        </div>

        <div className="iso-floating-badge badge-left">
          <div className="badge-val">{YearBuilt}</div>
          <div className="badge-lbl">Built Year</div>
        </div>

        <div className="iso-floating-badge badge-right">
          <div className="badge-val">📍 {Neighborhood}</div>
          <div className="badge-lbl">Ames Sector</div>
        </div>
      </div>

      <div className="iso-footer-info">
        <div className="iso-spec-pill">
          <span>Structure:</span>
          <strong>{BldgType}</strong>
        </div>
        <div className="iso-spec-pill">
          <span>Interactive 3D:</span>
          <strong>Mouse Parallax Active</strong>
        </div>
      </div>
    </div>
  );
}
