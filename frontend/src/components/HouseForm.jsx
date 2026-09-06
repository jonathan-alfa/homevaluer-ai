import React from 'react';
import { Building2, MapPin, BedDouble, ArrowRight, Sparkles } from 'lucide-react';

export default function HouseForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
  neighborhoodOptions = [],
  t
}) {
  const sqftToSqm = (sqft) => Math.round(sqft * 0.092903);

  const handleSlider = (name, value) => {
    onChange({ ...formData, [name]: Number(value) });
  };

  const handleSelect = (name, value) => {
    onChange({ ...formData, [name]: value });
  };

  return (
    <div className="form-fullwidth-card" id="house-form-card">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="form-columns-grid">
          {/* Column 1: Dimensi & Kualitas Bangunan */}
          <div className="form-column-box">
            <div className="col-heading">
              <Building2 size={16} />
              <span>{t.form.sec1}</span>
            </div>

            {/* Overall Quality Buttons 1 to 10 */}
            <div className="field-group">
              <div className="field-label-row">
                <span className="field-title">{t.form.overallQual}</span>
                <span className="field-val-tag">★ {formData.OverallQual} / 10</span>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {t.form.overallQualDesc}
              </div>
              <div className="quality-3d-grid" role="radiogroup" aria-label="Quality 1-10">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`btn-qual-3d ${formData.OverallQual === num ? 'active' : ''}`}
                    onClick={() => handleSlider('OverallQual', num)}
                    aria-checked={formData.OverallQual === num}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Living Area */}
            <div className="field-group">
              <div className="field-label-row">
                <span className="field-title">{t.form.grLivArea}</span>
                <span className="field-val-tag">
                  {formData.GrLivArea} sq ft ({sqftToSqm(formData.GrLivArea)} m²)
                </span>
              </div>
              <div className="slider-rail">
                <input
                  type="range"
                  min="400"
                  max="4500"
                  step="25"
                  value={formData.GrLivArea}
                  onChange={(e) => handleSlider('GrLivArea', e.target.value)}
                  id="input-GrLivArea"
                />
              </div>
            </div>

            {/* Basement Area */}
            <div className="field-group">
              <div className="field-label-row">
                <span className="field-title">{t.form.totalBsmtSF}</span>
                <span className="field-val-tag">
                  {formData.TotalBsmtSF} sq ft ({sqftToSqm(formData.TotalBsmtSF)} m²)
                </span>
              </div>
              <div className="slider-rail">
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="25"
                  value={formData.TotalBsmtSF}
                  onChange={(e) => handleSlider('TotalBsmtSF', e.target.value)}
                  id="input-TotalBsmtSF"
                />
              </div>
            </div>

            {/* Lot Area */}
            <div className="field-group">
              <div className="field-label-row">
                <span className="field-title">{t.form.lotArea}</span>
                <span className="field-val-tag">
                  {formData.LotArea.toLocaleString()} sq ft
                </span>
              </div>
              <div className="slider-rail">
                <input
                  type="range"
                  min="1500"
                  max="40000"
                  step="100"
                  value={formData.LotArea}
                  onChange={(e) => handleSlider('LotArea', e.target.value)}
                  id="input-LotArea"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Kawasan & Tahun Bangun */}
          <div className="form-column-box">
            <div className="col-heading">
              <MapPin size={16} />
              <span>{t.form.sec2}</span>
            </div>

            {/* Neighborhood */}
            <div className="field-group">
              <label htmlFor="select-neighborhood" className="field-title">
                {t.form.neighborhood}
              </label>
              <select
                id="select-neighborhood"
                className="select-3d"
                value={formData.Neighborhood}
                onChange={(e) => handleSelect('Neighborhood', e.target.value)}
              >
                {neighborhoodOptions.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Building Type */}
            <div className="field-group">
              <label htmlFor="select-bldgtype" className="field-title">
                {t.form.bldgType}
              </label>
              <select
                id="select-bldgtype"
                className="select-3d"
                value={formData.BldgType}
                onChange={(e) => handleSelect('BldgType', e.target.value)}
              >
                <option value="1Fam">Single-family Detached</option>
                <option value="2fmCon">Two-Family Conversion</option>
                <option value="Duplex">Duplex (2 Units)</option>
                <option value="TwnhsE">Townhouse End Unit</option>
                <option value="Twnhs">Townhouse Inside Unit</option>
              </select>
            </div>

            {/* Year Built */}
            <div className="field-group">
              <div className="field-label-row">
                <span className="field-title">{t.form.yearBuilt}</span>
                <span className="field-val-tag">{formData.YearBuilt}</span>
              </div>
              <div className="slider-rail">
                <input
                  type="range"
                  min="1900"
                  max="2010"
                  step="1"
                  value={formData.YearBuilt}
                  onChange={(e) => handleSlider('YearBuilt', e.target.value)}
                  id="input-YearBuilt"
                />
              </div>
            </div>

            {/* Year Remodeled */}
            <div className="field-group">
              <div className="field-label-row">
                <span className="field-title">{t.form.yearRemodAdd}</span>
                <span className="field-val-tag">{formData.YearRemodAdd}</span>
              </div>
              <div className="slider-rail">
                <input
                  type="range"
                  min="1950"
                  max="2010"
                  step="1"
                  value={formData.YearRemodAdd}
                  onChange={(e) => handleSlider('YearRemodAdd', e.target.value)}
                  id="input-YearRemodAdd"
                />
              </div>
            </div>
          </div>

          {/* Column 3: Ruang & Fasilitas Hunian */}
          <div className="form-column-box">
            <div className="col-heading">
              <BedDouble size={16} />
              <span>{t.form.sec3}</span>
            </div>

            {/* Garage Capacity */}
            <div className="field-group">
              <div className="field-label-row">
                <span className="field-title">{t.form.garageCars}</span>
                <span className="field-val-tag">{formData.GarageCars} {t.form.carsUnit}</span>
              </div>
              <div className="slider-rail">
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  value={formData.GarageCars}
                  onChange={(e) => handleSlider('GarageCars', e.target.value)}
                  id="input-GarageCars"
                />
              </div>
            </div>

            {/* Full Bath */}
            <div className="field-group">
              <div className="field-label-row">
                <span className="field-title">{t.form.fullBath}</span>
                <span className="field-val-tag">{formData.FullBath} {t.form.bathsUnit}</span>
              </div>
              <div className="slider-rail">
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  value={formData.FullBath}
                  onChange={(e) => handleSlider('FullBath', e.target.value)}
                  id="input-FullBath"
                />
              </div>
            </div>

            {/* Total Rooms Above Grade */}
            <div className="field-group">
              <div className="field-label-row">
                <span className="field-title">{t.form.totRmsAbvGrd}</span>
                <span className="field-val-tag">{formData.TotRmsAbvGrd} {t.form.roomsUnit}</span>
              </div>
              <div className="slider-rail">
                <input
                  type="range"
                  min="3"
                  max="14"
                  step="1"
                  value={formData.TotRmsAbvGrd}
                  onChange={(e) => handleSlider('TotRmsAbvGrd', e.target.value)}
                  id="input-TotRmsAbvGrd"
                />
              </div>
            </div>

            {/* Fireplaces */}
            <div className="field-group">
              <div className="field-label-row">
                <span className="field-title">{t.form.fireplaces}</span>
                <span className="field-val-tag">{formData.Fireplaces} {t.form.fireplacesUnit}</span>
              </div>
              <div className="slider-rail">
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="1"
                  value={formData.Fireplaces}
                  onChange={(e) => handleSlider('Fireplaces', e.target.value)}
                  id="input-Fireplaces"
                />
              </div>
            </div>
          </div>

          {/* 3D Primary Action Button */}
          <button
            id="btn-submit-predict"
            type="submit"
            className="btn-calc-3d"
            disabled={isLoading}
          >
            <Sparkles size={20} />
            <span>{isLoading ? t.form.btnLoading : t.form.btnSubmit}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
