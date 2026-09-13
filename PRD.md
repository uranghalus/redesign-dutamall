# Product Requirement Document (PRD) & Project Brief
## Modernisasi Digital Experience Platform Duta Mall Banjarmasin & FUGO Hotel

---

### 1. Executive Summary & Project Overview

* **Nama Proyek:** Duta Mall Digital Experience Modernization
* **Klien / Organisasi:** Duta Mall Banjarmasin (PT Govindo Utama / Govindo Group)
* **Status:** In Design & Prototyping (Desktop & Mobile Versions Live)
* **Konteks:** Duta Mall Banjarmasin merupakan pusat perbelanjaan, hiburan, dan gaya hidup terbesar serta terlengkap di Kalimantan Selatan yang terintegrasi langsung dengan FUGO Hotel & Suites dan Cinema XXI / The Premiere.
* **Tujuan Utama:** Mengubah kehadiran web Duta Mall dari situs statis konvensional menjadi platform digital omni-channel interaktif bernilai tinggi, memberikan kemudahan pencarian tenant, jadwal film real-time, fasilitas mall, serta pemesanan hotel langsung bagi pengunjung lokal maupun wisatawan.

---

### 2. Problem Statement & Business Opportunity

#### 2.1 Masalah Saat Ini (Legacy State)
* **Navigasi & Pencarian Sulit:** Website sebelumnya memiliki katalog direktori yang sulit ditelusuri dan minim informasi lokasi spesifik unit/lantai.
* **Informasi Hiburan & Bioskop Terfragmentasi:** Pengunjung harus berpindah platform hanya untuk mengecek jadwal film Cinema XXI Banjarmasin.
* **Kurangnya Integrasi Hospitality (FUGO Hotel):** Sinergi antara mall dan hotel bintang 4 di atas mall belum terkomunikasikan secara optimal.
* **Pengalaman Mobile Rendah:** Situs lama belum dioptimalkan untuk perangkat seluler yang menjadi tumpuan 85%+ pengunjung ritel saat berkunjung langsung.

#### 2.2 Peluang Bisnis (Targeted Impact)
* Meningkatkan *foot-traffic* dan kunjungan tenant melalui direktori interaktif berbasis kategori.
* Meningkatkan konversi pemesanan kamar FUGO Hotel dan *ticketing* bioskop via *deep-linking*.
* Memperkuat citra brand Duta Mall sebagai pusat ritel modern kebanggaan Kalimantan Selatan dengan slogan *"Gawi Sabumi Kawa Manuntung"*.

---

### 3. User Personas & Target Audience

| Persona | Profil & Kebutuhan | Pain Points | Solusi Desain |
| :--- | :--- | :--- | :--- |
| **Weekend Shopper & Families** | Warga lokal/keluarga yang mencari tempat belanja, makan, dan rekreasi akhir pekan. | Susah menemukan fasilitas ramah keluarga (nursery, musholla, parkir). | Quick Facility Grid, Filter Kategori Tenant, Agenda "What's On". |
| **Movie Enthusiast** | Penonton bioskop reguler yang ingin cek jam tayang dan ketersediaan format (Atmos, Premiere). | Harus buka aplikasi pihak ketiga yang lambat; jadwal sering tidak jelas. | Dedicated dark-cinema showcase dengan badge D-Box / Premiere dan quick showtime pills. |
| **Business Traveler / Tourist** | Tamu luar kota yang menginap di FUGO Hotel atau transit di Banjarmasin. | Tidak tahu akses mall langsung dari lobi hotel dan akses ke bandara (25 menit). | Highlight terintegrasi FUGO Hotel & Suites dengan opsi *Book Direct*. |
| **Prospective Tenants & Partners** | Brand nasional/internasional yang ingin menyewa unit usaha (*leasing*). | Kurang visibilitas profil mall, footfall, dan kontak manajemen. | Section kontak resmi, jam operasional jelas, dan branding Govindo Group. |

---

### 4. System Architecture & Scope of Deliverables

#### 4.1 Deliverables Platform
1. **Desktop Web Portal (`SCREEN_4`):** Tata letak resolusi tinggi (1280px+) dengan pengalaman editorial kaya visual, navigasi multi-level, dan peta interaktif.
2. **Mobile Web & PWA (`SCREEN_2`):** Tampilan touch-first (390px) dengan fixed bottom bar, tap-friendly action buttons, dan horizontal swipe carousel.
3. **Design System & Token Architecture (`DESIGN_SYSTEM_1` - Urban Horizon):**
   - **Primary Color:** Crimson Red (`#d82b1e`) - merepresentasikan kehangatan, antusiasme, dan identitas brand Duta Mall.
   - **Secondary & Accent:** Gold / Amber (`#d97706` / `#ffd700`) untuk aksen The Premiere & Luxury FUGO Hotel.
   - **Neutral & Dark Themes:** Neutral Warm Cream (`#faf9f7`) untuk area ritel, serta Cinema Dark (`#121214`) untuk XXI section.
   - **Typography:** Plus Jakarta Sans (Modern Geometric Sans-Serif).

---

### 5. Detailed Feature Specifications

#### 5.1 Global Header & Navigation
* **Operational Status Banner:** Menampilkan jam buka harian (*Open Daily 10:00 - 22:00 WITA*), kontak telepon customer service, dan penunjuk lokasi.
* **Instant Search & Action Center:** Bilah pencarian tenant, restoran, film, dan fasilitas mall. Tombol aksi cepat *"Plan Visit"* / *"Pesan Kamar"*.
* **Mobile Quick-Access Hub:** Ikon navigasi bundar di mobile untuk Cinema XXI, Tenant, FUGO Hotel, Food Court, dan Fasilitas.

#### 5.2 Hero Banner & Seasonal Campaigns
* **Banjar Cultural Identity:** Penegasan identitas lokal khas Banjar *"Gawi Sabumi Kawa Manuntung"*.
* **Carousel Acara & Promo Utama:** Highlight festival belanja budaya, festival anak, dan pameran otomotif terkini.

#### 5.3 Cinema XXI & The Premiere Experience
* **Dark-mode Theatrical UI:** Desain imersif dengan poster film vertikal, rating bintang, durasi, batasan usia (13+, 17+), dan badge teater (Dolby Atmos, D-BOX, Premiere).
* **Interactive Showtime Slots:** Tombol jam tayang interaktif dan direct call-to-action *"Pilih Kursi"*.

#### 5.4 Mall Facilities & Guest Comfort (12 Fasilitas Inti)
* Grid ikonik 12 fasilitas utama:
  1. Pusat Informasi (Concierge)
  2. Lobi & Lift FUGO Hotel
  3. ATM Center (Semua Bank Nasional)
  4. Ladies Parking (Area Parkir Khusus Wanita)
  5. Fasilitas Ramah Disabilitas (Ramp & Kursi Roda)
  6. Ruang Medis / Pertolongan Pertama (Klinik)
  7. Ruang Laktasi & Bayi (Nursery Room)
  8. Musholla Nyaman (P2 & L3)
  9. Parkir Luas (Kapasitas 2.500+ Mobil & Motor)
  10. Toilet Higienis Touchless
  11. Area Duduk Istirahat (Sitting Lounge)
  12. Designated Outdoor Smoking Terrace

#### 5.5 Tenant & Boutique Directory
* **Filter Kategori Cepat:** Pill toggle (*Semua, Beauty & Wellness, F&B & Coffee, Fashion & Lifestyle*).
* **Tenant Cards:** Logo tenant, spesifikasi lantai & nomor unit (contoh: *Erha Ultimate [1st Fl - Unit 12]*, *Fore Coffee [Ground Fl - Main Atrium]*, *Kopi Kenangan*, *Guardian*, *Lascada*, dll.).
* **Call-to-Action:** Tombol perluas katalog *"Lihat Semua 200+ Tenant"*.

#### 5.6 Hospitality Spotlight: FUGO Hotel Banjarmasin
* Hotel bintang 4 di lantai teratas mall dengan pemandangan panorama kota Banjarmasin.
* Detail fasilitas: 180 kamar Deluxe & Suite, 2 Restoran Fine Dining, Grand Ballroom 300 pax, 25 menit ke Bandara Internasional Syamsudin Noor.
* Tombol CTA langsung: *"Book Now"* & *"Meeting & Event Inquiries"*.

#### 5.7 What's On & CSR Activities
* Kartu berita, kegiatan bakti sosial/donor darah, perayaan komunitas, dan agenda musik akustik akhir pekan (*Weekend Live Acoustic*).

#### 5.8 Lokasi, Akses & Footer
* Integrasi peta Google Maps interaktif (Jl. Ahmad Yani KM 2 Banjarmasin).
* Tombol satu-sentuhan buka rute Maps dan direct dial telepon hotline `(0511) 327-8888`.
* Footer korporat dengan tautan regulasi, kebijakan privasi, serta identitas Govindo Group.

---

### 6. Non-Functional Requirements & Performance Metrics

* **Responsive Design:** 100% fluid breakpoint dari Mobile (390px - 430px), Tablet (768px), hingga Desktop Ultra-wide (1440px+).
* **Accessibility (WCAG 2.1 AA):** Rasio kontras teks minimum 4.5:1 untuk teks normal dan 3:1 untuk teks besar serta elemen UI interaktif.
* **Performance Targets:**
  - First Contentful Paint (FCP) < 1.2 detik.
  - Largest Contentful Paint (LCP) < 2.5 detik.
  - Cumulative Layout Shift (CLS) < 0.05.
* **SEO & Meta-tagging:** Optimalisasi kata kunci regional (*"Duta Mall Banjarmasin"*, *"Cinema XXI Banjarmasin"*, *"FUGO Hotel Banjarmasin"*, *"Jadwal Bioskop Banjarmasin"*).

---

### 7. Release Roadmap & Next Steps

* **Fase 1 (Selesai):** Desain prototipe UI/UX Beranda Desktop (`SCREEN_4`) dan Mobile App Bar (`SCREEN_2`).
* **Fase 2 (Berikutnya):**
  - Pembuatan Halaman Detail Direktori Tenant (dengan denah lantai/floor map interaktif).
  - Integrasi Live API Jadwal Tayang Cinema XXI & Form Reservasi Kamar FUGO Hotel.
  - Pengujian kegunaan (*usability testing*) pada pengguna seluler di area Banjarmasin.
