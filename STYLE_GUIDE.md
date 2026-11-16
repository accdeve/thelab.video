# Style Guide & Design System: The Lab Indonesia

Dokumen ini mendokumentasikan panduan gaya visual (*visual style guide*), sistem desain (*design system tokens*), dan komponen antarmuka (UI) untuk website **The Lab Indonesia** ([thelab.id](https://www.thelab.id)).

---

## 1. Brand Overview & Karakter Visual

* **Niche**: Pendidikan Coding & Robotika Anak (Usia 5–16 tahun).
* **Target Audiens**: 
  * *Decision Maker*: Orang tua yang mencari pendidikan teknologi berkualitas dan terpercaya.
  * *End User*: Anak-anak (taman kanak-kanak hingga remaja).
* **Tone of Voice Visual**:
  * **Kredibel & Edukatif**: Mencerminkan kurikulum berstandar internasional yang terstruktur.
  * **Eksploratif & Ramah Anak**: Visual yang cerah, ramah (*approachable*), tidak kaku, dan membangkitkan rasa ingin tahu (*curiosity*).

---

## 2. Palet Warna (Color Tokens)

Sistem warna memadukan warna gelap berwibawa (*Trust*) dengan aksen warna cerah yang energetik (*Creativity & Playful*).

### 2.1. Primary & Brand Colors
| Token Name | Hex Code | Deskripsi & Peran |
| :--- | :--- | :--- |
| `--color-navy-dark` | `#090640` | Deep Midnight Navy; warna dasar tergelap, teks judul kontras tinggi, background navigasi/kontainer |
| `--color-navy-primary` | `#0F145B` | Royal Midnight Navy; warna primer brand, tombol sekunder, border kartu pilar |
| `--color-indigo` | `#161176` | Indigo Navy; varian warna brand untuk aksen link aktif dan header |

### 2.2. Accent & Action Colors
| Token Name | Hex Code | Deskripsi & Peran |
| :--- | :--- | :--- |
| `--color-yellow-primary` | `#FECF41` | Cyber Gold / Yellow; warna utama tombol Call-To-Action (CTA) "Trial Class Gratis", aksen garis kartu |
| `--color-yellow-light` | `#FFCF62` | Warm Amber; aksen border-top kartu dan elemen sorotan |
| `--color-yellow-hover` | `#FFC30F` | State hover untuk tombol CTA utama |
| `--color-teal-primary` | `#00BDCD` | Bright Cyan / Teal; aksen teknologi, outline chip lokasi, aksen kartu pilar 3 |
| `--color-teal-secondary` | `#48B7B1` | Soft Teal; tombol checkout / interaksi sekunder |
| `--color-teal-dark` | `#005B7F` | Dark Teal; teks link dan teks badge kategori |

### 2.3. Neutral & Surface Colors
| Token Name | Hex Code | Deskripsi & Peran |
| :--- | :--- | :--- |
| `--color-surface-white` | `#FFFFFF` | Background kartu, container konten utama |
| `--color-surface-soft` | `#F3F4F8` | Abu-abu kebiruan terang untuk background chip / section berselang |
| `--color-surface-cyan` | `#E5F8FA` | Background tint sangat muda untuk pill badge kategori |
| `--color-border-line` | `#E6E8F0` | Garis batas (*border*) halus kartu dan pembatas (*divider*) |
| `--color-text-body` | `#231F20` / `#24272E` | Teks paragraf utama (tingkat kontras optimal untuk keterbacaan) |
| `--color-text-muted` | `#5B6070` | Teks keterangan sekunder, sub-heading kartu, dan caption |

---

## 3. Tipografi (Typography)

Website menggunakan kombinasi 3 jenis font untuk membedakan judul yang mencolok (*expressive*), judul struktural yang bersih (*structured*), dan teks isi yang mudah dibaca (*legible*).

### 3.1. Font Families
1. **Display Heading**: `'Coolvetica', sans-serif`
   * Digunakan untuk *Hero Title* dan teks promosi besar bernuansa modern-retro.
2. **Primary Heading**: `'Raleway', sans-serif`
   * Digunakan untuk judul section (H1, H2, H3), judul kartu, dan sub-judul utama.
   * Karakter bobot: Bold (700) & Extra Bold (800).
3. **Body & UI**: `'Open Sans', sans-serif`
   * Digunakan untuk paragraf teks, tombol CTA, label badge, navigasi, dan microcopy.
   * Karakter bobot: Regular (400), Semi-bold (600), Bold (700).

### 3.2. Skala Ukuran Tipografi (Type Scale)

| Level | Font Family | Size | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Coolvetica | `55px` – `75px` | Regular/Bold | `1.1` | `1.5px` |
| **Heading 1 (H1)** | Raleway | `36px` – `45px` | 700 / 800 | `1.2` | Normal |
| **Heading 2 (H2)** | Raleway | `28px` – `32px` | 800 | `1.25` | `0` |
| **Heading 3 (H3)** | Raleway | `19px` – `22px` | 800 | `1.3` | `0` |
| **Body Large** | Open Sans | `16px` | 400 / 600 | `1.7` | Normal |
| **Body Base** | Open Sans | `15px` | 400 | `1.6` | Normal |
| **Badges / Chips** | Open Sans | `12px` | 700 | `1.4` – `1.6` | `0.1em` – `0.12em` (UPPERCASE) |
| **Button Text** | Open Sans | `15px` – `16px` | 700 | `1.3` | Normal |

---

## 4. Layout & Spacing System

### 4.1. Container & Grid
* **Container Max Width**: `1140px`
* **Desktop Padding**: `0 16px` hingga `0 24px`
* **Grid Layouts**:
  * **2-Kolom Asimetris (Hero / Lokasi)**: `grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: 40px;`
  * **3-Kolom Kartu (Value Pillars)**: `grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px;`
* **Breakpoints Responsif**:
  * **Mobile (< 768px)**: Kolom berubah menjadi 1 kolom (`1fr`), gap `16px`, ukuran font H2 disesuaikan ke `26px`.
  * **Tablet (768px – 1024px)**: Gap `20px` – `24px`.
  * **Desktop (> 1024px)**: Tata letak penuh 2/3 kolom.

---

## 5. Komponen UI (Component Guidelines)

### 5.1. Tombol (Buttons)

#### A. Primary Action Button ("Coba Trial Class Gratis")
* **Background**: `#FECF41`
* **Teks**: `#090640` (Bold)
* **Border Radius**: `15px` (atau `999px` untuk varian pill penuh)
* **Padding**: `12px 24px`
* **Hover State**: Background `#FFC30F`, transisi halus `0.2s ease`

#### B. Secondary Action Button ("Learn More" / Dark CTA)
* **Background**: `#0F145B`
* **Teks**: `#FFFFFF` (Bold)
* **Border Radius**: `10px`
* **Padding**: `11px 18px`
* **Hover State**: Background `#1A2070`

#### C. Ghost / Outline Button
* **Background**: Transparan
* **Border**: `1px solid #090640`
* **Teks**: `#090640`
* **Border Radius**: `15px`

---

### 5.2. Kartu (Cards) & Elevasi

Ciri khas desain The Lab adalah **kartu dengan border aksen warna di bagian atas**:

* **Base Card**:
  * `background: #FFFFFF`
  * `border: 1px solid #E6E8F0`
  * `border-top: 6px solid <Aksen Warna>`
  * `border-radius: 18px`
  * `padding: 24px`
  * `box-shadow: 0 6px 20px rgba(15, 20, 91, 0.06)`
* **Variasi Warna Top-Border**:
  * Pilar 1: `#FFCF62` (Kuning)
  * Pilar 2: `#0F145B` (Navy)
  * Pilar 3: `#00BDCD` (Teal)

---

### 5.3. Chips & Badge Tags

#### Category / Age Label
* `border-radius: 999px`
* `background: #E5F8FA`
* `color: #005B7F`
* `font-size: 12px`
* `font-weight: 700`
* `letter-spacing: 0.12em`
* `text-transform: uppercase`
* `padding: 4px 12px`

#### Branch / Location Chips
* `border-radius: 999px`
* `background: #F3F4F8`
* `color: #0F145B`
* `font-size: 14px`
* `font-weight: 600`
* `padding: 6px 12px`
* *Tautan aktif*: Diberikan inset border teal `box-shadow: inset 0 0 0 1.5px #00BDCD`

---

## 6. Fotografi & Aset Visual

* **Gaya Foto**: Menampilkan foto asli kegiatan kelas (*authentic student engagement*), tangan merakit komponen robot/LEGO Spike, ekspresi antusias anak, dan lingkungan belajar yang nyaman dan terang.
* **Ikon**: Garis minimalis (Feather Icons / Material Icons) dalam lingkaran putih dengan background bulat dan shadow lembut.

---

## 7. Kode CSS Variabel Siap Pakai

```css
:root {
  /* Brand Navy */
  --tli-navy: #0F145B;
  --tli-navy-dark: #090640;
  --tli-navy-alt: #161176;

  /* Accents */
  --tli-yellow: #FECF41;
  --tli-yellow-hover: #FFC30F;
  --tli-teal: #00BDCD;
  --tli-teal-dark: #005B7F;

  /* Surfaces & Neutrals */
  --tli-surface-white: #FFFFFF;
  --tli-surface-soft: #F3F4F8;
  --tli-surface-cyan: #E5F8FA;
  --tli-line: #E6E8F0;
  --tli-text-body: #231F20;
  --tli-text-muted: #5B6070;

  /* Fonts */
  --tli-font-display: 'Coolvetica', sans-serif;
  --tli-font-heading: 'Raleway', sans-serif;
  --tli-font-body: 'Open Sans', sans-serif;

  /* Elevation */
  --tli-shadow-card: 0 6px 20px rgba(15, 20, 91, 0.06);
}
```
