# The Lab • Video Belajar (YouTube-Style PWA)

Aplikasi web katalog video panduan merakit LEGO & Robotika untuk siswa **The Lab Indonesia** dengan antarmuka yang dibuat **familiar seperti YouTube**, bersih dari distraksi, dan tanpa desain yang berlebihan (*zero AI-slop*).

---

## 🚀 Fitur Utama

1. **Desain Familiar Mirip YouTube (Zero Learning Curve)**:
   * **Top Navbar**: Logo The Lab dengan ikon play merah, kolom pencarian bentuk pil (*search pill*) khas YouTube.
   * **Filter Chips Bar**: Pilihan kategori program persis seperti *topic chips* di YouTube (`Semua`, `Spike Kinder`, `Spike Junior Foundation`, `Spike Junior`).
   * **Grid Video**: Thumbnail 16:9 ber-radius halus, avatar inisial channel "TL", judul model, dan nama program.
   * **YouTube Watch Page**: Layout tonton video ala YouTube desktop — video besar di sebelah kiri dengan tombol kembali, dan daftar *"Model Terkait / Up Next"* di bilah kanan.
2. **Autoplay Langsung**:
   * Begitu anak mengklik model mana pun dari grid atau daftar bilah kanan, video **langsung otomatis berputar (*autoplay*)** tanpa perlu menekan tombol play lagi.
3. **Pencarian Cepat Sesuai Kertas Picking List**:
   * Kolom pencarian instan di bagian atas (cukup ketik sepenggal kata seperti `croc`, `car`, `robot`, atau nama lengkapnya).
   * **Bilah Huruf Alfabet (A–Z)** di bawah chips bar untuk mempermudah anak yang menggunakan tablet agar tidak perlu mengetik panjang.
4. **Tipografi Bersih & Elegan**:
   * Menggunakan font **Plus Jakarta Sans** di seluruh antarmuka.
   * Bebas dari dekorasi berlebihan atau tumpukan ikon/emoji yang mengganggu fokus anak.

---

## 🛠️ Cara Menjalankan

Cukup buka file [index.html](file:///Users/aditya/Life/Pekerjaan/The%20Lab/video_playlist/index.html) di browser Google Chrome / Safari, atau jalankan local server:

```bash
python3 -m http.server 3000
```
Buka browser di `http://localhost:3000`.
