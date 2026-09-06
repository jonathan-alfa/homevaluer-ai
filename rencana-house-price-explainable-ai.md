# Rencana Project: House Price Prediction — Explainable AI Dashboard

## Ringkasan
Dashboard prediksi harga rumah berbasis machine learning yang dilengkapi explainability (SHAP), sehingga user tidak hanya melihat angka prediksi tapi juga memahami faktor apa saja yang mempengaruhi harga tersebut.

**Tech Stack:** React (frontend) + FastAPI (backend) + Scikit-learn/XGBoost (model) + SHAP (explainability)

---

## 1. Dataset & Model (dikerjakan offline/duluan)

**Dataset:** Ames Housing / House Prices - Advanced Regression Techniques (Kaggle)
- ~1.400–2.900 baris data, puluhan fitur (luas tanah, jumlah kamar, tahun dibangun, lokasi, kualitas bangunan, dll)

**Langkah:**
- [ ] Eksplorasi data (EDA): cek missing value, distribusi harga, korelasi fitur
- [ ] Preprocessing: handle missing value, encoding fitur kategorikal, feature scaling
- [ ] Training model: mulai dari Random Forest Regressor atau XGBoost Regressor (lebih mudah di-SHAP dibanding neural net)
- [ ] Evaluasi model: RMSE, MAE, R²
- [ ] Simpan model terlatih ke file `.pkl` / `.joblib`

---

## 2. Backend (FastAPI)

**Endpoint yang dibutuhkan:**
- [ ] `POST /predict` — terima fitur rumah, kembalikan prediksi harga
- [ ] `POST /explain` (atau digabung ke `/predict`) — kembalikan nilai SHAP per fitur untuk prediksi tersebut
- [ ] `GET /feature-importance` — feature importance global (opsional, untuk overview dashboard)

**Catatan teknis:**
- [ ] Load model sekali saat startup aplikasi (bukan setiap request) agar response cepat
- [ ] Validasi input (pastikan fitur yang dikirim sesuai skema yang diharapkan model)

---

## 3. Frontend (React)

**Komponen yang dibutuhkan:**
- [ ] Form input fitur rumah — mulai dari 8–10 fitur penting dulu (luas bangunan, jumlah kamar, tahun dibangun, lokasi, kualitas keseluruhan, dll) agar tidak terlalu kompleks di awal
- [ ] Tampilan hasil prediksi harga
- [ ] Visualisasi SHAP (bar chart / waterfall chart) — menunjukkan fitur mana yang menaikkan/menurunkan harga prediksi
- [ ] (Opsional) Dashboard overview: statistik dataset, distribusi harga, feature importance global

---

## 4. Timeline Kasar (± 2–3 minggu, santai)

| Minggu | Fokus |
|---|---|
| 1 | EDA + preprocessing + training model + evaluasi |
| 2 | Bangun FastAPI backend + integrasi SHAP + testing endpoint |
| 3 | Bangun React frontend + hubungkan ke backend + styling dashboard |

---

## Catatan Tambahan
- Model & training pipeline dikerjakan terpisah (offline, di notebook), bukan bagian dari alur runtime aplikasi.
- Prioritaskan fungsi inti (prediksi + SHAP) dulu sebelum menambah fitur dashboard tambahan.
