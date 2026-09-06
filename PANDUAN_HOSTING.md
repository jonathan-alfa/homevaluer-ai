# 🌐 Panduan Lengkap Hosting HomeValuer AI (Gratis & Siap Dipublikasikan)

Dokumen ini berisi panduan langkah demi langkah untuk meng-onlinekan proyek **HomeValuer AI** agar bisa diakses oleh siapa saja lewat internet (dosen, rekan kerja, portofolio LinkedIn, dll).

---

## 📋 Langkah 0: Upload Proyek ke GitHub (Persiapan Wajib)

Sebelum menghubungkan ke platform hosting, proyek harus di-push terlebih dahulu ke repository GitHub Anda.

### 1. Buat Repository Baru di GitHub
1. Buka [github.com](https://github.com) dan login.
2. Klik tombol hijau **New** (atau tanda plus `+` di pojok kanan atas ➔ **New repository**).
3. Beri nama repository, misalnya: `house-price-prediction-ai` atau `homevaluer-ai`.
4. Pilih **Public**.
5. Jangan centang "Add a README" (karena di proyek lokal kita sudah ada).
6. Klik **Create repository**.

### 2. Jalankan Perintah Git di Terminal (PowerShell / Command Prompt)
Buka terminal di folder proyek (`C:\file penting\CODING PROGRAM\assets\Project House Price Prediction`), lalu jalankan perintah berikut secara berurutan:

```bash
# 1. Inisialisasi Git
git init

# 2. Tambahkan semua file (file besar/cache sudah otomatis dikecualikan oleh .gitignore)
git add .

# 3. Buat commit pertama
git commit -m "feat: complete explainable house price prediction web app"

# 4. Ubah nama branch utama ke main
git branch -M main

# 5. Hubungkan ke repository GitHub Anda (ganti URL dengan URL repo Anda)
git remote add origin https://github.com/USERNAME_ANDA/house-price-prediction-ai.git

# 6. Push kode ke GitHub
git push -u origin main
```

---

## 🚀 Pilihan 1: Hosting Tercepat & Termudah (Vercel) — *Selesai dalam 2 Menit!*

> **Kenapa Pilihan Ini Sangat Direkomendasikan?**
> Frontend aplikasi ini sudah memiliki **mesin AI lokal cerdas (`localEngine.js`)** dan **kurs dollar otomatis pasar terbuka (`currencyService.js`)**.
> Artinya, meskipun tanpa server backend terpisah, website di Vercel sudah **100% bisa memprediksi harga, menampilkan grafik SHAP Waterfall, ranking fitur, panduan pemula, dan kurs dollar real-time**!

### Langkah-langkah:
1. Buka [vercel.com](https://vercel.com) dan pilih **Sign Up** / **Log In** dengan akun **GitHub**.
2. Di dashboard Vercel, klik tombol **"Add New..."** ➔ **"Project"**.
3. Temukan repository GitHub Anda tadi (`house-price-prediction-ai`), lalu klik **"Import"**.
4. Di halaman konfigurasi:
   - **Framework Preset**: Pilih `Vite`.
   - **Root Directory**: Klik tombol **Edit** di sampingnya, lalu pilih folder `frontend`.
   - **Build Command**: Biarkan default (`npm run build`).
   - **Output Directory**: Biarkan default (`dist`).
5. Klik tombol biru **"Deploy"**!
6. Tunggu sekitar 1 menit. Selesai! 🎉
7. Anda akan mendapatkan URL live seperti:  
   👉 **`https://house-price-prediction-ai.vercel.app`**  
   Link ini sudah bisa langsung Anda bagikan ke siapa pun!

---

## ⚡ Pilihan 2: Hosting Fullstack 1 URL Sekaligus (Render.com)

Jika Anda ingin menjalankan model Machine Learning Python asli (`backend/run.py` & `.joblib`) bersama frontend dalam 1 link tunggal:

### Langkah-langkah:
1. Buat akun di [render.com](https://render.com) (gratis) menggunakan akun GitHub.
2. Klik tombol **"New +"** di pojok kanan atas ➔ pilih **"Web Service"**.
3. Hubungkan repository GitHub Anda.
4. Isi data konfigurasi berikut:
   - **Name**: `homevaluer-ai` (atau nama pilihan Anda)
   - **Region**: `Singapore` (paling cepat untuk akses dari Indonesia)
   - **Runtime**: `Python 3`
   - **Branch**: `main`
   - **Build Command**:
     ```bash
     pip install -r backend/requirements.txt && cd frontend && npm install && npm run build && cd ..
     ```
   - **Start Command**:
     ```bash
     python -m uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT
     ```
   - **Instance Type**: Pilih **Free**
5. Klik **"Create Web Service"**.
6. Render akan menginstal dependencies Python, me-build frontend React, dan menjalankan server.
7. Setelah berstatus *Live*, Anda akan mendapatkan link seperti:  
   👉 **`https://homevaluer-ai.onrender.com`**

---

## 🌟 Pilihan 3: Kombinasi Terbaik (Frontend di Vercel + Backend di Render)

1. Deploy **Backend** di Render.com sebagai Web Service Python:
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `python -m uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
   - Dapatkan URL backend, misalnya: `https://homevaluer-api.onrender.com`
2. Deploy **Frontend** di Vercel:
   - Di pengaturan Vercel ➔ bagian **Environment Variables**, tambahkan:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://homevaluer-api.onrender.com`
3. Klik **Redeploy**.
4. Frontend akan memanggil API backend di Render. Jika server backend Render sedang *cold start* (tidur sejenak di paket gratis), frontend secara otomatis beralih ke mesin AI lokal tanpa pernah membuat pengguna melihat layar error!

---

## 💡 Tips & Catatan Penting
- **Gratis 100%**: Baik Vercel maupun Render menyediakan paket gratis (Free Tier) tanpa perlu memasukkan kartu kredit.
- **Auto-Deploy**: Setiap kali Anda melakukan perubahan kode dan menjalankan `git push`, Vercel dan Render akan otomatis meng-update website Anda secara langsung!
