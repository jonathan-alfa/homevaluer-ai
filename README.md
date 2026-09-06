# 🏡 HomeValuer AI — House Price Prediction & Explainable AI Dashboard

Dashboard prediksi harga rumah berbasis **Machine Learning (Gradient Boosting / XGBoost)** dengan transparansi penuh melalui **Explainable AI (SHAP TreeExplainer)**.

Aplikasi ini tidak hanya menampilkan taksiran angka harga rumah, namun membongkar dan menjelaskan secara visual dan naratif faktor-faktor apa saja yang **menaikkan** atau **menurunkan** harga taksiran tersebut terhadap harga acuan pasar (*base value*).

---

## 🚀 Fitur Utama

1. **Prediksi Harga Cerdas & Akurat**:
   - Dilatih menggunakan dataset resmi Kaggle: [House Prices - Advanced Regression Techniques](https://www.kaggle.com/c/house-prices-advanced-regression-techniques) (Ames Housing, 1.460 data transaksi).
   - Akurasi model tinggi: **$R^2 = 0.9167$ (91.7%)** pada test set evaluasi.
   - Konversi langsung taksiran harga USD ke Rupiah (IDR).
2. **Alur Desain Vertikal Per-Section**:
   - Tata letak mengalir ke bawah yang terstruktur (*Step 01: Parameter Fitur*, *Step 02: Taksiran Valuasi*, *Step 03: SHAP Waterfall*, *Step 04: Pengaruh Pasar Global*).
3. **Tema Monokrom Hitam-Putih & Mode Cerah/Gelap (Light & Dark Mode)**:
   - Palet warna eksklusif monokrom arsitektural (*deep blacks, crisp whites, metallic slates*).
   - Tombol toggle pengalih tema langsung di navbar dengan transisi halus.
4. **Dukungan Penuh 2 Bahasa (Bilingual ID 🇮🇩 / EN 🇬🇧)**:
   - Pengalih bahasa instan di navbar yang mengubah seluruh label form, deskripsi, preset, tooltip, visualisasi, dan narasi AI tanpa reload halaman.
5. **Halaman Terpisah: Panduan Edukasi untuk Orang Awam (`#guide`)**:
   - Disediakan tombol khusus di navbar (**"📖 Panduan Pemula"**) dan di hero section.
   - Berisi analogi sederhana (analogi struk belanja), penjelasan konsep kotak hitam AI vs SHAP, kamus bahasa awam 12 fitur properti, dan FAQ interaktif (accordion) agar siapa pun yang baru pertama kali menggunakan AI dapat langsung memahami arti angka dan grafik.
6. **Elemen & Efek 3D Interaktif**:
   - **3D Isometric Interactive House Card** yang merespons pergerakan kursor (*mouse parallax tilt*).
   - Tombol dan kartu bergaya *tactile push 3D* dengan bayangan bertingkat.
6. **Tipografi Arsitektural**:
   - Judul & Angka: **Space Grotesk** (tegas & modern, tidak monoton).
   - Body & Label: **Plus Jakarta Sans** (sangat jernih & mudah dibaca).
   - Angka Teknis: **JetBrains Mono**.
7. **Visualisasi SHAP Waterfall & Force Breakdown**:
   - Dekomposisi kontribusi per fitur dengan bar monokrom kontras tinggi (+ untuk penambah, - untuk pemotong).
   - Filter tampilan: Semua faktor, Hanya Positif (+), atau Hanya Negatif (-).
8. **Analisis Keputusan AI (Smart Narrative Summary)**:
   - Penjelasan dalam kalimat alami (*natural language*) dwibahasa (Bahasa Indonesia & English) yang merangkum alasan di balik angka valuasi.
9. **Preset Profil Rumah Cepat (1-Click Test)**:
   - *Modern Luxury Estate*, *Suburban Family Home*, *Cozy Starter Cottage*, dan *Urban Modern Townhouse*.
10. **Eksplorasi Statistik Dataset**:
   - Modal interaktif melihat median pasar ($163.000), rata-rata pasar ($180.921), perbandingan harga antar-lingkungan (*neighborhood*), dan hubungan kualitas vs harga.

---

## 🛠️ Arsitektur & Tech Stack

```
Project House Price Prediction/
├── data/
│   └── raw/
│       └── train.csv               # Dataset Kaggle resmi Ames Housing (1.460 rows, 81 cols)
├── ml/
│   ├── eda_and_train.py            # Skrip EDA, preprocessing pipeline, training & SHAP explainer
│   ├── eda_and_train.ipynb         # Jupyter Notebook eksperimen offline
│   └── artifacts/                  # Artefak model terlatih
│       ├── model.joblib            # Model Gradient Boosting Regressor terlatih
│       ├── preprocessor.joblib     # Scikit-Learn ColumnTransformer
│       ├── explainer.joblib        # SHAP TreeExplainer
│       ├── metadata.json           # Skema fitur, preset rumah, dan global importance
│       └── dataset_summary.json    # Statistik EDA agregat
├── backend/
│   ├── requirements.txt            # Dependensi backend Python
│   ├── run.py                      # Uvicorn entry point
│   ├── test_backend.py             # Script verifikasi unit test
│   └── app/
│       ├── main.py                 # FastAPI endpoints (/predict, /explain, /feature-importance)
│       ├── schemas.py              # Pydantic schemas
│       └── model_service.py        # Singleton service pemroses SHAP & inferensi
├── frontend/
│   ├── package.json
│   ├── vite.config.js              # Proxy ke backend port 8000
│   └── src/
│       ├── index.css               # Vanilla CSS design system (Luxury Obsidian Glassmorphism)
│       ├── App.jsx                 # Dashboard state manager & layout
│       └── components/             # Komponen UI modular
├── start_all.bat                   # Menjalankan Backend + Frontend sekaligus (1-klik)
├── start_backend.bat               # Menjalankan FastAPI server saja
└── start_frontend.bat              # Menjalankan Vite frontend saja
```

---

## ⚡ Cara Menjalankan

### Cara 1: Sekali Klik (Windows)
Cukup klik ganda file:
```cmd
start_all.bat
```
Script ini akan otomatis menyalakan Backend FastAPI (Port 8000), Frontend React (Port 5173), lalu membuka browser di `http://localhost:5173`.

---

### Cara 2: Menjalankan Secara Manual

#### 1. Jalankan Backend (FastAPI)
Buka terminal baru di folder proyek:
```powershell
.\.venv\Scripts\python.exe backend/run.py
```
Backend akan aktif di: `http://127.0.0.1:8000`  
Dokumentasi Swagger API interaktif dapat diakses di: `http://127.0.0.1:8000/docs`

#### 2. Jalankan Frontend (React + Vite)
Buka terminal kedua:
```powershell
cd frontend
npm run dev
```
Buka browser di: `http://localhost:5173`

---

## 🧪 Melatih Ulang Model (Offline Training)

Jika ingin melakukan retraining model atau memperbarui SHAP Explainer:
```powershell
.\.venv\Scripts\python.exe ml/eda_and_train.py
```
Atau jalankan notebook Jupyter di `ml/eda_and_train.ipynb`.

---

## 📊 Hasil Evaluasi Model

| Metrik Evaluasi | Nilai | Keterangan |
|---|---|---|
| **$R^2$ Score** | **0.9167** | Menjelaskan 91.7% variansi harga rumah di test set |
| **RMSE** | **$25,270** | Root Mean Squared Error |
| **MAE** | **$16,672** | Mean Absolute Error |
| **SHAP Base Value** | **$181,442** | Rata-rata ekspektasi harga pasar dasar |
| **Top Global Feature** | `OverallQual` | Kualitas material & finishing menyumbang 33.3% pengaruh harga |

---

*Dikembangkan sesuai panduan arsitektur pada `rencana-house-price-explainable-ai.md`.*
