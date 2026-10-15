*Baca dalam bahasa lain: [Inggris](README.md), [Indonesia](README-id.md).*

# Platform Pembaca Webtoon 📚✨

**🌍 Demo Langsung:** [Komik Loud Inside](https://loudinside.vercel.app/)

Aplikasi web interaktif buatan khusus yang dirancang untuk menampilkan komik digital/webtoon. Proyek ini berfungsi sebagai platform membaca khusus dengan fitur seperti navigasi bab, pemutaran audio imersif, dan desain responsif.

## 📖 Latar Belakang Proyek & Kolaborasi

Proyek ini adalah upaya kolaboratif yang lahir dari sebuah tugas akhir universitas.

- **Seni & Cerita**: Ilustrasi, karakter, dan alur cerita sepenuhnya dibuat oleh teman saya sebagai hasil utama untuk proyek tugas akhir ida. (Karya dia juga telah diterbitkan secara resmi di platform Webtoon!)
- **Platform**: Saya merancang dan mengembangkan seluruh aplikasi web ini dari awal untuk berfungsi sebagai media pameran digital interaktif untuk tugas akhir mereka.

Pemisahan tugas ini memungkinkan kami untuk menggabungkan penceritaan kreatif dengan pengembangan web modern, menghasilkan pengalaman membaca yang mulus.

## 🚀 Fitur Utama

- **Pengalaman Pembaca Khusus**: Antarmuka membaca webtoon layar penuh yang responsif dan dioptimalkan untuk perangkat desktop dan seluler.
- **Audio Imersif**: Audio latar belakang/BGM terintegrasi yang meningkatkan pengalaman bercerita, lengkap dengan kontrol audio khusus.
- **Navigasi Cerdas**: Menu pemilihan bab yang intuitif, tombol aksi mengambang (Gulir ke Atas), dan alur navigasi "Akhir Bab".
- **UI/UX Modern**: Dibangun dengan estetika mode gelap yang ramping menggunakan overlay, efek blur (glassmorphism), dan animasi mikro yang halus.

## 💻 Tech Stack (Teknologi yang Digunakan)

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (untuk state audio global)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Peran Rekayasa Saya (My Engineering Role)

Sebagai pengembang tunggal platform ini, fokus saya adalah memberikan aplikasi siap produksi yang mematuhi praktik terbaik front-end modern:
- **Arsitektur Berbasis Komponen**: Memfaktorkan ulang halaman kompleks menjadi komponen UI yang lebih kecil dan dapat digunakan kembali (`TopOverlay`, `BottomOverlay`, `ChapterListMenu`) dengan mematuhi Prinsip Tanggung Jawab Tunggal (Single Responsibility Principle).
- **Custom Hooks**: Mengabstraksi pendengar acara DOM (seperti pelacakan gulir) dan logika state UI ke dalam custom React hooks (`useReaderState`) untuk menjaga komponen presentasi tetap bersih.
- **Performa**: Menggunakan komponen `Image` dari Next.js untuk pemuatan aset yang dioptimalkan dan mengimplementasikan utilitas CSS khusus untuk mengelola scrollbar tanpa menyuntikkan skrip sebaris.

## ⚙️ Memulai

Pertama, instal dependensi:

```bash
npm install
```

Kemudian, jalankan server pengembangan:

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) dengan peramban Anda untuk melihat hasilnya.
