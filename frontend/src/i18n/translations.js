export const translations = {
  id: {
    nav: {
      brand: "HomeValuer AI",
      badge: "Explainable AI",
      subtitle: "Taksiran Harga Rumah & Transparansi Model SHAP",
      statusReady: "Model Siap (Gradient Boosting 91.7% R²)",
      statsBtn: "Statistik Pasar",
      guideBtn: "Panduan Pemula (Baca Dulu)",
      backToDashboard: "← Kembali ke Dashboard",
      themeDark: "Mode Gelap",
      themeLight: "Mode Cerah",
    },
    hero: {
      tag: "Sistem Valuasi Cerdas Berbasis Data",
      title: "Prediksi Harga Rumah dengan Pemahaman Penuh Faktor Penentunya.",
      desc: "Kombinasi model Machine Learning presisi tinggi (R² = 91.7%) dan Explainable AI (SHAP TreeExplainer). Anda tidak hanya mendapatkan angka valuasi akhir, namun dapat melihat faktor fisik dan lokasi mana saja yang menaikkan atau memotong harga dari standar pasar.",
      modelPill: "Dilatih pada 1.460 Data Rumah Kaggle Ames",
      readGuideBtn: "📖 Baca Panduan Lengkap untuk Orang Awam",
    },
    iso: {
      header: "Spek Isometrik Arsitektur 3D",
      materialGrade: "Kelas Kualitas",
      builtYear: "Tahun Dibangun",
      sector: "Kawasan Ames",
      structure: "Struktur",
      interactive: "Paralaks Mouse Aktif"
    },
    presets: {
      title: "Preset Profil Rumah Contoh",
      subtitle: "Klik profil untuk langsung menguji konfigurasi rumah nyata",
      luxury: { name: "Modern Luxury Estate", tag: "Mewah & Luas" },
      suburban: { name: "Suburban Family Home", tag: "Keluarga Nyaman" },
      starter: { name: "Cozy Starter Cottage", tag: "Kompak Ekonomis" },
      townhouse: { name: "Urban Modern Townhouse", tag: "Modern Praktis" },
    },
    sections: {
      s1_badge: "LANGKAH 01",
      s1_title: "Konfigurasi Parameter Properti",
      s1_desc: "Sesuaikan atribut fisik, dimensi bangunan, tahun konstruksi, dan lokasi kawasan.",
      
      s2_badge: "LANGKAH 02",
      s2_title: "Hasil Estimasi Valuasi & Analisis Keputusan AI",
      s2_desc: "Taksiran nilai pasar properti serta rangkuman naratif faktor utama pendorong harga.",
      
      s3_badge: "LANGKAH 03",
      s3_title: "Dekomposisi Nilai SHAP (Waterfall Breakdown)",
      s3_desc: "Transparansi terinci kontribusi penambahan (+) atau pengurangan (-) tiap fitur terhadap harga dasar pasar.",
      
      s4_badge: "LANGKAH 04",
      s4_title: "Pengaruh Pasar Global & Intelijen Dataset",
      s4_desc: "Faktor penentu harga paling berpengaruh di seluruh 1.460 sampel data pasar perumahan Ames.",
    },
    features: {
      OverallQual: "Kualitas Bangunan",
      GrLivArea: "Luas Ruang Tinggal",
      TotalBsmtSF: "Luas Area Basement",
      GarageCars: "Kapasitas Garasi",
      YearBuilt: "Tahun Dibangun",
      YearRemodAdd: "Tahun Renovasi",
      Neighborhood: "Kawasan / Lokasi",
      LotArea: "Luas Kavling Tanah",
      Fireplaces: "Jumlah Perapian",
      FullBath: "Kamar Mandi Lengkap",
      TotRmsAbvGrd: "Total Kamar",
      BldgType: "Tipe Struktur Bangunan"
    },
    units: {
      cars: "mobil",
      rooms: "ruang",
      baths: "kamar",
      fireplaces: "unit",
      sqft: "sq ft"
    },
    form: {
      sec1: "Dimensi & Kualitas Bangunan",
      sec2: "Lokasi & Tahun Konstruksi",
      sec3: "Ruangan & Fasilitas Hunian",
      
      overallQual: "Kualitas Material & Finishing",
      overallQualDesc: "Skala 1 (Sangat Buruk) hingga 10 (Sangat Mewah)",
      
      grLivArea: "Luas Lantai Tinggal di Atas Tanah",
      totalBsmtSF: "Luas Area Basement",
      lotArea: "Luas Kavling Tanah",
      
      neighborhood: "Kawasan Lingkungan",
      bldgType: "Tipe Struktur Bangunan",
      yearBuilt: "Tahun Konstruksi Selesai",
      yearRemodAdd: "Tahun Renovasi Terakhir",
      
      garageCars: "Kapasitas Garasi Mobil",
      fullBath: "Kamar Mandi Lengkap",
      totRmsAbvGrd: "Total Ruangan (di atas tanah)",
      fireplaces: "Jumlah Perapian",
      
      btnSubmit: "Hitung Taksiran & Analisis SHAP",
      btnLoading: "Memproses Valuasi & Nilai SHAP...",
      carsUnit: "mobil",
      roomsUnit: "ruang",
      bathsUnit: "kamar",
      fireplacesUnit: "unit",
    },
    prediction: {
      cardTag: "Estimasi Valuasi Pasar",
      confidence: "Akurasi Model",
      idrNote: "*(kurs otomatis diperbarui dari pasar valas)",
      liveRatePrefix: "kurs otomatis terkini: ",
      baseMarket: "Harga Acuan Pasar Dasar (Base Value)",
      diffLabel: "Deviasi terhadap Acuan Pasar",
      aboveBase: "di atas acuan pasar",
      belowBase: "di bawah acuan pasar",
    },
    narrative: {
      title: "Ringkasan Keputusan Kecerdasan Buatan (AI Summary)",
      switchLang: "Bahasa",
      increasesValuation: "meningkatkan taksiran",
      decreasesValuation: "menurunkan taksiran"
    },
    shap: {
      title: "Transparansi Faktor Harga (SHAP Waterfall)",
      desc: "Membongkar kontribusi spesifik tiap fitur terhadap deviasi harga pasar",
      filterAll: "Semua Faktor",
      filterPos: "Faktor Penambah (+)",
      filterNeg: "Faktor Pemotong (-)",
      legendPos: "Dampak Positif (Mendorong harga naik di atas base value)",
      legendNeg: "Dampak Negatif (Mendiskon harga di bawah base value)",
      inputVal: "Nilai",
    },
    importance: {
      title: "Ranking Faktor Pengaruh Global (Pasar Ames)",
      desc: "Rata-rata pengaruh absolut nilai SHAP tiap fitur di seluruh 1.460 data rumah",
      avgImpact: "Rata-rata pengaruh",
    },
    modal: {
      title: "Statistik & Eksplorasi Dataset Ames Housing",
      subtitle: "Ringkasan karakteristik pasar dari 1.460 data transaksi Kaggle",
      totalSamples: "Total Sampel Data",
      medianPrice: "Median Harga Jual",
      meanPrice: "Rata-Rata Harga (Mean)",
      priceRange: "Rentang Harga Pasar",
      tableNeighborhood: "Daftar Rata-Rata Harga Berdasarkan Kawasan (Neighborhood)",
      tableQuality: "Hubungan Kualitas Bangunan vs Median Harga",
      colRank: "No",
      colNeighborhood: "Kawasan",
      colSamples: "Jumlah Sampel",
      colAvg: "Rata-Rata ($)",
      colMedian: "Median ($)",
      colQuality: "Skala Kualitas",
    },
    loading: {
      title: "Menganalisis Properti & Menghitung SHAP",
      subtitle: "Model Gradient Boosting sedang mengevaluasi 12 parameter fisik & lokasi...",
      steps: [
        "Memvalidasi 12 parameter fitur properti...",
        "Menjalankan model inferensi Gradient Boosting (91.7% R²)...",
        "Menghitung dekomposisi kontribusi SHAP TreeExplainer...",
        "Menyusun narasi kecerdasan buatan...",
        "Selesai! Mengarahkan ke hasil valuasi..."
      ],
      directing: "Mengarahkan ke Hasil Estimasi..."
    },
    guide: {
      badge: "PANDUAN & EDUKASI PEMULA",
      title: "Cara Kerja Valuasi AI & Memahami Penjelasan SHAP",
      subtitle: "Penjelasan santai tanpa rumus matematika rumit agar siapa pun (bahkan yang baru pertama kali mendengar AI) bisa langsung paham apa arti angka-angka di aplikasi ini.",
      
      sec1_badge: "KONSEP DASAR 01",
      sec1_title: "Bagaimana AI Menentukan Harga Rumah?",
      sec1_text: "Bayangkan seorang penilai properti senior yang telah mencatat 1.460 transaksi jual-beli rumah asli di kota Ames, Iowa. Komputer mempelajari pola tersebut menggunakan algoritma Gradient Boosting (kumpulan pohon keputusan). AI melihat hubungan antara kualitas material, luas tanah, lokasi, dan tahun bangun terhadap harga transaksi riil. Model ini memiliki akurasi 91.7% (R² = 0.9167), artinya 91.7% variasi harga di pasar dapat diprediksi dengan sangat tepat oleh model.",
      comp_trad_badge: "Cara Tradisional",
      comp_trad_title: "Perkiraan Manual Sederhana",
      comp_trad_desc: "Mengandalkan intuisi atau rumus kaku (misal: luas x harga per meter). Sering melewatkan kombinasi kompleks seperti pengaruh usia konstruksi terhadap nilai lokasi.",
      comp_ai_badge: "Kecerdasan Buatan (Gradient Boosting)",
      comp_ai_title: "Analisis 1.460 Pola Nyata",
      comp_ai_desc: "Membangun ratusan pohon keputusan statistik yang saling mengoreksi kesalahan. Mempertimbangkan sinergi 12 variabel sekaligus dengan akurasi 91.7% R².",
      
      sec2_badge: "KONSEP DASAR 02",
      sec2_title: "Apa Masalah AI Biasa dan Solusi SHAP?",
      sec2_analogy_title: "💡 Analogi Struk Belanja / Tim Sepak Bola",
      sec2_p1: "Sebagian besar AI bersifat 'Black Box' (Kotak Hitam) — Anda memasukkan data rumah, AI mengeluarkan angka $350.000, tapi tidak ada yang tahu mengapa harganya segitu. Apakah karena luasnya? Atau lokasinya?",
      sec2_p2: "Di sinilah peran SHAP (SHapley Additive exPlanations). SHAP membongkar kotak hitam tersebut dan menghitung kontribusi matematis tiap fitur seperti halnya rincian struk belanjaan:",
      sec2_points: [
        { label: "Base Value ($181.442)", desc: "Harga rata-rata standar seluruh rumah di pasar sebelum memperhitungkan keunikan rumah Anda." },
        { label: "Nilai Positif (+) Hijau/Solid", desc: "Faktor keunggulan rumah Anda yang menaikkan taksiran di atas standar pasar (misal: kualitas bahan bintang 9 menaikkan +$124.000)." },
        { label: "Nilai Negatif (-) Striped", desc: "Faktor kekurangan atau faktor usia yang memotong/mendiskon taksiran di bawah standar pasar (misal: bangunan tua 1960 memotong -$25.000)." },
        { label: "Final Price = Base + Semua SHAP", desc: "Hasil penjumlahan matematis persis dari harga dasar ditambah semua poin plus dan minus." }
      ],

      sec3_badge: "KAMUS BAHASA AWAM",
      sec3_title: "Penjelasan 12 Istilah Fitur Properti",
      glossary: [
        {
          term: "OverallQual (Kualitas Material & Finishing)",
          tag: "Paling Berpengaruh (33.3%)",
          desc: "Menilai mutu bahan bangunan, pengerjaan arsitektur, dan kemewahan finishing dari skala 1 (sangat buruk/rusak) hingga 10 (sangat istimewa/istana). Ini adalah faktor nomor 1 yang paling dicari pembeli."
        },
        {
          term: "GrLivArea (Luas Bangunan di Atas Tanah)",
          tag: "Pengaruh No. 2 (17.3%)",
          desc: "Total luas lantai ruang huni di atas permukaan tanah (ruang tamu, kamar tidur, dapur) dalam satuan square feet (sq ft). 1 sq ft setara dengan ~0,093 m²."
        },
        {
          term: "TotalBsmtSF (Luas Ruang Bawah Tanah / Basement)",
          tag: "Pengaruh No. 3 (10.8%)",
          desc: "Di daerah beriklim dingin seperti Amerika, ruang bawah tanah sangat penting untuk penyimpanan, ruang rekreasi keluarga, dan ruang instalasi pemanas."
        },
        {
          term: "YearBuilt (Tahun Konstruksi Asli)",
          tag: "Faktor Usia Fisik",
          desc: "Tahun pertama kali rumah selesai dibangun. Rumah yang lebih baru umumnya bernilai lebih tinggi karena standar konstruksi modern dan belum mengalami keausan pondasi."
        },
        {
          term: "YearRemodAdd (Tahun Renovasi Besar)",
          tag: "Faktor Penyegaran",
          desc: "Tahun di mana rumah mengalami renovasi struktural besar. Rumah tua yang direnovasi total pada tahun 2005 akan bernilai jauh lebih tinggi daripada rumah tua yang dibiarkan asli."
        },
        {
          term: "Neighborhood (Kawasan Lingkungan)",
          tag: "Faktor Lokasi Emas",
          desc: "Pepatah 'Location, Location, Location!'. Kawasan seperti Northridge (NoRidge) atau Stone Brook (StoneBr) adalah kawasan elit berharga tinggi, sementara OldTown adalah kawasan bersejarah tua."
        },
        {
          term: "GarageCars (Kapasitas Garasi Mobil)",
          tag: "Fasilitas Utama",
          desc: "Jumlah kapasitas mobil yang bisa parkir terlindung di dalam garasi tertutup (0 hingga 4 mobil). Sangat mempengaruhi kenyamanan pemilik rumah."
        },
        {
          term: "FullBath (Kamar Mandi Lengkap)",
          tag: "Fasilitas Ruang",
          desc: "Jumlah kamar mandi yang memiliki toilet, wastafel, dan pancuran/bak mandi (bathtub) di atas tanah."
        },
        {
          term: "TotRmsAbvGrd (Total Kamar di Atas Tanah)",
          tag: "Kapasitas Hunian",
          desc: "Total seluruh ruangan di atas tanah (kamar tidur, ruang kerja, ruang keluarga), tidak termasuk kamar mandi."
        },
        {
          term: "Fireplaces (Jumlah Perapian)",
          tag: "Fitur Kenyamanan",
          desc: "Jumlah tungku perapian kayu/gas. Di daerah dingin, perapian menambah nilai kenyamanan dan estetika kemewahan ruang keluarga."
        },
        {
          term: "LotArea (Luas Kavling Tanah)",
          tag: "Ukuran Properti",
          desc: "Total luas kavling pekarangan tanah tempat rumah berdiri dalam satuan square feet."
        },
        {
          term: "BldgType (Tipe Struktur Bangunan)",
          tag: "Arsitektur",
          desc: "Single-family Detached (rumah tunggal berdiri sendiri), Townhouse (rumah berderet dinding bersama), atau Duplex (satu bangunan dibagi dua unit keluarga)."
        }
      ],

      faq_badge: "TANYA JAWAB (FAQ)",
      faq_title: "Pertanyaan yang Sering Diajukan Pemula",
      faqs: [
        {
          q: "Apakah taksiran harga ini adalah harga pasti di pasar nyata?",
          a: "Model ini memberikan taksiran nilai wajar (Fair Market Value) berdasarkan data transaksi historis ril di pasar Ames Housing dengan akurasi 91.7%. Harga negosiasi akhir di dunia nyata tentu bisa sedikit bervariasi bergantung pada kesepakatan pembeli dan penjual."
        },
        {
          q: "Mengapa ada faktor bernilai minus (-), padahal rumahnya terlihat bagus?",
          a: "Nilai minus pada SHAP bukan berarti fiturnya jelek atau bernilai negatif, melainkan nilainya berada di bawah rata-rata seluruh pasar. Misalnya: jika rata-rata rumah memiliki luas 1.700 sq ft, maka rumah berukuran 1.200 sq ft akan mendapat nilai SHAP negatif karena ukurannya lebih kecil dari rata-rata pembanding pasar."
        },
        {
          q: "Bagaimana cara membaca grafik SHAP Waterfall?",
          a: "Mulai dari kiri (Base Value $181.442). Setiap bar melambangkan satu fitur. Bar solid bertanda (+) mendorong harga naik ke kanan, sedangkan bar strip bertanda (-) memotong harga ke kiri. Titik akhir dari seluruh bar adalah harga prediksi final."
        },
        {
          q: "Bagaimana jika saya ingin mencoba profil rumah lain?",
          a: "Anda bisa langsung mengklik salah satu dari 4 tombol 'Preset Profil Rumah' di dashboard (misal: Modern Luxury Estate untuk rumah mewah, atau Cozy Starter Cottage untuk rumah sederhana), atau geser slider sesuai keinginan Anda!"
        }
      ],

      cta_title: "Sudah Paham Konsepnya? Waktunya Mencoba!",
      cta_desc: "Eksplorasi simulasi harga rumah dan lihat bagaimana perubahan luas atau kualitas seketika mengubah taksiran valuasi serta faktor SHAP.",
      cta_btn: "Kembali ke Dashboard & Mulai Taksir →"
    },
    footer: {
      copy: "HomeValuer AI — Sistem Valuasi Properti & Explainable AI (SHAP)",
      details: "Dataset Resmi Kaggle Ames Housing • Model: Gradient Boosting (R² = 91.7%) • Arsitektur Monokrom 3D",
    }
  },
  en: {
    nav: {
      brand: "HomeValuer AI",
      badge: "Explainable AI",
      subtitle: "House Price Valuation & SHAP Decision Transparency",
      statusReady: "Model Ready (Gradient Boosting 91.7% R²)",
      statsBtn: "Market Stats",
      guideBtn: "Beginner Guide (Read First)",
      backToDashboard: "← Back to Dashboard",
      themeDark: "Dark Mode",
      themeLight: "Light Mode",
    },
    hero: {
      tag: "Data-Driven Property Intelligence",
      title: "Predict House Valuation with Complete Understanding of Key Drivers.",
      desc: "Combining high-precision Machine Learning (R² = 91.7%) with Explainable AI (SHAP TreeExplainer). Discover not just a final valuation number, but exactly which physical and location factors increase or discount the price from the market baseline.",
      modelPill: "Trained on 1,460 Kaggle Ames Housing Records",
      readGuideBtn: "📖 Read the Beginner's Guide",
    },
    iso: {
      header: "3D Architectural Isometric Spec",
      materialGrade: "Material Grade",
      builtYear: "Built Year",
      sector: "Ames Sector",
      structure: "Structure",
      interactive: "Mouse Parallax Active"
    },
    presets: {
      title: "Preset Property Profiles",
      subtitle: "Click any profile to instantly evaluate real benchmark homes",
      luxury: { name: "Modern Luxury Estate", tag: "Spacious & Luxury" },
      suburban: { name: "Suburban Family Home", tag: "Comfortable Family" },
      starter: { name: "Cozy Starter Cottage", tag: "Compact & Affordable" },
      townhouse: { name: "Urban Modern Townhouse", tag: "Modern & Convenient" },
    },
    sections: {
      s1_badge: "STEP 01",
      s1_title: "Property Feature Configuration",
      s1_desc: "Configure physical dimensions, construction period, room counts, and neighborhood location.",
      
      s2_badge: "STEP 02",
      s2_title: "Valuation Estimate & AI Decision Summary",
      s2_desc: "Final predicted market valuation along with natural language decision drivers.",
      
      s3_badge: "STEP 03",
      s3_title: "SHAP Value Decomposition (Waterfall Breakdown)",
      s3_desc: "Transparent dollar-by-dollar breakdown showing feature additions (+) and deductions (-).",
      
      s4_badge: "STEP 04",
      s4_title: "Global Market Factors & Dataset Intelligence",
      s4_desc: "Most influential market determinants across all 1,460 Ames residential transactions.",
    },
    features: {
      OverallQual: "Overall Quality",
      GrLivArea: "Living Area",
      TotalBsmtSF: "Basement Area",
      GarageCars: "Garage Capacity",
      YearBuilt: "Year Built",
      YearRemodAdd: "Year Remodeled",
      Neighborhood: "Neighborhood",
      LotArea: "Lot Area",
      Fireplaces: "Fireplaces",
      FullBath: "Full Bathrooms",
      TotRmsAbvGrd: "Total Rooms",
      BldgType: "Building Type"
    },
    units: {
      cars: "cars",
      rooms: "rooms",
      baths: "baths",
      fireplaces: "units",
      sqft: "sq ft"
    },
    form: {
      sec1: "Building Dimensions & Quality",
      sec2: "Location & Construction Period",
      sec3: "Living Rooms & Amenities",
      
      overallQual: "Material & Finish Quality",
      overallQualDesc: "Scale from 1 (Very Poor) to 10 (Very Luxurious)",
      
      grLivArea: "Above Ground Living Area",
      totalBsmtSF: "Total Basement Area",
      lotArea: "Lot Area",
      
      neighborhood: "Neighborhood Location",
      bldgType: "Dwelling Structure Type",
      yearBuilt: "Original Construction Year",
      yearRemodAdd: "Last Major Remodel Year",
      
      garageCars: "Garage Car Capacity",
      fullBath: "Full Bathrooms Above Grade",
      totRmsAbvGrd: "Total Rooms (Above Grade)",
      fireplaces: "Number of Fireplaces",
      
      btnSubmit: "Calculate Valuation & SHAP Breakdown",
      btnLoading: "Processing Valuation & SHAP Values...",
      carsUnit: "cars",
      roomsUnit: "rooms",
      bathsUnit: "baths",
      fireplacesUnit: "units",
    },
    prediction: {
      cardTag: "Market Valuation Result",
      confidence: "Model Confidence",
      idrNote: "*(auto-updated from live forex market)",
      liveRatePrefix: "live market rate: ",
      baseMarket: "Market Baseline Price (Base Value)",
      diffLabel: "Difference vs Baseline Price",
      aboveBase: "above market baseline",
      belowBase: "below market baseline",
    },
    narrative: {
      title: "Artificial Intelligence Decision Summary",
      switchLang: "Language",
      increasesValuation: "increases valuation by",
      decreasesValuation: "decreases valuation by"
    },
    shap: {
      title: "Price Driver Transparency (SHAP Waterfall)",
      desc: "Decomposing each feature's exact marginal dollar contribution to the market price deviation",
      filterAll: "All Factors",
      filterPos: "Value Additions (+)",
      filterNeg: "Value Deductions (-)",
      legendPos: "Positive Impact (Drives price up from baseline)",
      legendNeg: "Negative Impact (Discounts price below baseline)",
      inputVal: "Value",
    },
    importance: {
      title: "Global Market Drivers Ranking (Ames Market)",
      desc: "Average absolute SHAP impact of each attribute across all 1,460 housing records",
      avgImpact: "Average impact",
    },
    modal: {
      title: "Ames Housing Dataset Statistics & Exploration",
      subtitle: "Market overview across 1,460 authentic Kaggle transaction records",
      totalSamples: "Total Market Records",
      medianPrice: "Median Sale Price",
      meanPrice: "Mean Sale Price",
      priceRange: "Market Price Range",
      tableNeighborhood: "Average Valuation by Neighborhood",
      tableQuality: "Overall Quality vs Median Price",
      colRank: "Rank",
      colNeighborhood: "Neighborhood",
      colSamples: "Sample Count",
      colAvg: "Mean Price ($)",
      colMedian: "Median Price ($)",
      colQuality: "Quality Scale",
    },
    loading: {
      title: "Analyzing Property & Computing SHAP",
      subtitle: "Gradient Boosting model is evaluating 12 physical & location parameters...",
      steps: [
        "Validating 12 property feature parameters...",
        "Running Gradient Boosting model inference (91.7% R²)...",
        "Computing SHAP TreeExplainer contribution breakdown...",
        "Synthesizing artificial intelligence decision narrative...",
        "Complete! Navigating to valuation results..."
      ],
      directing: "Navigating to Valuation Results..."
    },
    guide: {
      badge: "BEGINNER GUIDE & EDUCATION",
      title: "How AI Property Valuation & SHAP Explainability Work",
      subtitle: "A crystal clear, jargon-free guide so that anyone (even first-time AI users) can effortlessly understand what these numbers and charts represent.",
      
      sec1_badge: "CORE PRINCIPLE 01",
      sec1_title: "How Does Machine Learning Appraise a Home?",
      sec1_text: "Imagine an experienced senior real estate appraiser who has documented 1,460 genuine home sales in Ames, Iowa. A machine learning model (Gradient Boosting) studies all those transaction records to find statistical patterns between physical quality, area, age, and sale price. It achieves an R² score of 91.7%, meaning 91.7% of price variations in the market are accurately captured by the model.",
      comp_trad_badge: "Traditional Method",
      comp_trad_title: "Basic Manual Estimation",
      comp_trad_desc: "Relies on intuition or rigid rules of thumb (e.g. price per square meter/foot). Often misses complex interactions such as how construction age affects neighborhood premiums.",
      comp_ai_badge: "Artificial Intelligence (Gradient Boosting)",
      comp_ai_title: "Analysis of 1,460 Authentic Sales",
      comp_ai_desc: "Constructs hundreds of statistical decision trees that iteratively correct pricing errors, evaluating 12 property variables simultaneously with 91.7% R² accuracy.",
      
      sec2_badge: "CORE PRINCIPLE 02",
      sec2_title: "The 'Black Box' AI Dilemma and the SHAP Solution",
      sec2_analogy_title: "💡 The Shopping Receipt Analogy",
      sec2_p1: "Traditional AI operates as a 'Black Box' — you submit home features, and the AI outputs $350,000 without explaining why. Is it because of the spacious living room? Or the premium location?",
      sec2_p2: "This is where SHAP (SHapley Additive exPlanations) steps in. SHAP unpacks the black box into a transparent, itemized shopping receipt:",
      sec2_points: [
        { label: "Base Value ($181,442)", desc: "The average benchmark price of homes across the Ames market before evaluating your home's unique attributes." },
        { label: "Positive Values (+) Solid/Black", desc: "Premium features that push the valuation above the market average (e.g. 9/10 Quality adds +$124,000)." },
        { label: "Negative Values (-) Striped", desc: "Older age or smaller dimensions that discount the valuation below the market average (e.g. built in 1960 discounts -$25,000)." },
        { label: "Final Price = Base + All SHAP Values", desc: "The exact mathematical sum of the baseline price plus all positive additions and negative deductions." }
      ],

      sec3_badge: "PLAIN-LANGUAGE GLOSSARY",
      sec3_title: "The 12 House Attributes Explained",
      glossary: [
        {
          term: "OverallQual (Overall Material & Finish Quality)",
          tag: "Top Driver (33.3% Total Impact)",
          desc: "Rates the architectural craftsmanship, structural material, and interior finishes from 1 (Very Poor/Damaged) to 10 (Very Luxurious/Estate). This is consistently the #1 factor buyers pay for."
        },
        {
          term: "GrLivArea (Above Ground Living Area)",
          tag: "Rank #2 Driver (17.3%)",
          desc: "The total square footage of heated living space above ground level (living room, bedrooms, kitchen). 1 sq ft is approx. 0.093 square meters."
        },
        {
          term: "TotalBsmtSF (Total Basement Area)",
          tag: "Rank #3 Driver (10.8%)",
          desc: "In continental US climates, finished and unfinished basements provide vital recreation space, mechanical storage, and shelter."
        },
        {
          term: "YearBuilt (Original Construction Year)",
          tag: "Physical Age Factor",
          desc: "The year the home was originally completed. Newer construction commands higher prices due to modern building codes and un-weathered foundations."
        },
        {
          term: "YearRemodAdd (Remodel / Renovation Year)",
          tag: "Rejuvenation Factor",
          desc: "The year of the last substantial structural renovation. An older home fully remodeled in 2005 retains substantially higher value than an un-renovated home."
        },
        {
          term: "Neighborhood (Location Sector)",
          tag: "Location Factor",
          desc: "The golden rule of real estate: 'Location, Location, Location!'. Sectors like Northridge (NoRidge) or Stone Brook are upscale enclaves, whereas OldTown features historic, older homes."
        },
        {
          term: "GarageCars (Garage Vehicle Capacity)",
          tag: "Key Amenity",
          desc: "Number of cars accommodated in an enclosed private garage (0 to 4 cars). High garage capacity significantly boosts suburban home appeal."
        },
        {
          term: "FullBath (Full Bathrooms Above Grade)",
          tag: "Family Convenience",
          desc: "Count of complete bathrooms containing toilet, sink, and bathtub/shower on the main levels."
        },
        {
          term: "TotRmsAbvGrd (Total Rooms Above Grade)",
          tag: "Living Capacity",
          desc: "All above-ground rooms (bedrooms, office, dining), excluding bathrooms."
        },
        {
          term: "Fireplaces (Number of Fireplaces)",
          tag: "Luxury Accent",
          desc: "Wood-burning or gas fireplaces providing warmth and living room ambiance during Iowa winters."
        },
        {
          term: "LotArea (Property Parcel Area)",
          tag: "Land Dimension",
          desc: "The total parcel land size in square feet on which the residential property sits."
        },
        {
          term: "BldgType (Dwelling Structure Type)",
          tag: "Architecture Type",
          desc: "Single-family Detached (standalone house), Townhouse (attached multi-level unit), or Duplex (divided into two residences)."
        }
      ],

      faq_badge: "FREQUENTLY ASKED QUESTIONS",
      faq_title: "Common Beginner Questions Answered",
      faqs: [
        {
          q: "Is this estimated valuation an absolute guarantee?",
          a: "The model predicts the Fair Market Value based on real market sales data with 91.7% accuracy. Actual transaction prices in the real world can vary slightly depending on buyer-seller negotiations and unique cosmetic touches."
        },
        {
          q: "Why do some features have negative (-) numbers if the house is good?",
          a: "A negative SHAP value does not mean the house is bad; it simply means that specific attribute is smaller or older than the market average. For example, if the market average living area is 1,700 sq ft, a 1,200 sq ft home will receive a negative SHAP adjustment because it offers less space than the benchmark."
        },
        {
          q: "How do I read the SHAP Waterfall chart?",
          a: "Start from the left at Base Value ($181,442). Each bar represents one feature. Solid bars with (+) push the price up to the right, while striped bars with (-) discount the price to the left. The final stopping point is the exact predicted price."
        },
        {
          q: "How can I test other home scenarios?",
          a: "Click any of the 4 Preset Profile buttons on the dashboard (e.g., Modern Luxury Estate or Cozy Starter Cottage) or adjust the sliders and click 'Calculate Valuation & SHAP Breakdown'!"
        }
      ],

      cta_title: "Ready to Test? Put Knowledge into Action!",
      cta_desc: "Simulate different home configurations and watch in real-time how adjustments in square footage or quality immediately transform the valuation and SHAP drivers.",
      cta_btn: "Back to Dashboard & Start Valuing →"
    },
    footer: {
      copy: "HomeValuer AI — Explainable Real Estate Valuation Engine (SHAP)",
      details: "Official Kaggle Ames Housing Dataset • Model: Gradient Boosting (R² = 91.7%) • 3D Monochrome Architecture",
    }
  }
};
