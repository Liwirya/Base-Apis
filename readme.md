# HaewonAPIs

\<p align="center"\>
\<a href="[https://github.com/Liwirya/Base-Apis/blob/main/LICENSE](https://www.google.com/search?q=https://github.com/Liwirya/Base-Apis/blob/main/LICENSE)"\>
\<img src="[https://img.shields.io/github/license/Liwirya/Base-Apis?style=for-the-badge\&color=blue](https://www.google.com/search?q=https://img.shields.io/github/license/Liwirya/Base-Apis%3Fstyle%3Dfor-the-badge%26color%3Dblue)" alt="Lisensi"\>
\</a\>
\<a href="[https://github.com/Liwirya/Base-Apis/stargazers](https://www.google.com/search?q=https://github.com/Liwirya/Base-Apis/stargazers)"\>
\<img src="[https://img.shields.io/github/stars/Liwirya/Base-Apis?style=for-the-badge\&color=yellow](https://www.google.com/search?q=https://img.shields.io/github/stars/Liwirya/Base-Apis%3Fstyle%3Dfor-the-badge%26color%3Dyellow)" alt="Bintang"\>
\</a\>
\<a href="[https://github.com/Liwirya/Base-Apis/network/members](https://www.google.com/search?q=https://github.com/Liwirya/Base-Apis/network/members)"\>
\<img src="[https://img.shields.io/github/forks/Liwirya/Base-Apis?style=for-the-badge\&color=green](https://www.google.com/search?q=https://img.shields.io/github/forks/Liwirya/Base-Apis%3Fstyle%3Dfor-the-badge%26color%3Dgreen)" alt="Forks"\>
\</a\>
\</p\>

**HaewonAPIs** adalah REST API modular dan ringan yang dibangun dengan **Express.js**. Didesain untuk pengembangan yang cepat dan kemudahan *deployment*, terutama di platform seperti Vercel.

-----

## ✨ Fitur Utama

  - **Swagger UI Integration**: Dokumentasi API interaktif yang dibuat secara otomatis, memudahkan pengujian *endpoint*.
  - **Rate Limiting**: Melindungi API dari serangan *brute-force* dengan membatasi jumlah permintaan dari satu alamat IP.
  - **Security Headers**: Dilengkapi dengan *header* keamanan seperti `X-XSS-Protection`, `Strict-Transport-Security`, dan `Content-Security-Policy` untuk meningkatkan keamanan.
  - **Discord Webhook Logging**: Notifikasi *real-time* ke *channel* Discord setiap kali ada akses API, baik berhasil maupun gagal.
  - **Speedtest Endpoint**: Fitur bawaan untuk menguji kecepatan *upload*, *ping*, dan mendapatkan informasi jaringan server.
  - **Struktur Modular**: Proyek disusun dalam modul-modul terpisah (`router`, `scrapers`, `schema`) untuk kemudahan pengembangan dan pemeliharaan.

-----

## 🔧 Teknologi yang Digunakan

| Kategori | Teknologi |
| --- | --- |
| **Bahasa & Runtime** |   |
| **Framework & Library** |   |
| **Lainnya** | `cors`, `express-rate-limit`, `chalk`, `axios` |

-----

## 📦 Prasyarat & Instalasi

Pastikan Anda memiliki Node.js versi **20.0.0** atau lebih tinggi.

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/Liwirya/Base-Apis.git
    ```
2.  **Masuk ke direktori proyek:**
    ```bash
    cd Base-Apis
    ```
3.  **Install semua dependensi:**
    ```bash
    npm install
    ```

-----

## 🚀 Menjalankan Proyek

### Menjalankan Server

Untuk menjalankan server secara lokal, gunakan perintah:

```bash
node index.js
```

Server akan berjalan pada port yang ditentukan di `schema/config.js` (default: **1904**). Anda dapat mengaksesnya di `http://localhost:1904`.

### Mode Pengembangan

Untuk pengembangan, disarankan menggunakan `nodemon` agar server otomatis me-restart setiap ada perubahan file.

```bash
npm run dev
```

-----

## 📁 Struktur Proyek

```
Base-Apis/
├── index.js                # Entry point aplikasi
├── router/
│   └── api.js              # Mendefinisikan semua rute API
├── scrapers/
│   └── tools.js            # Logika untuk fitur seperti speedtest
├── schema/
│   ├── config.js           # Konfigurasi utama proyek
│   └── endpoint.js         # Konfigurasi dokumentasi Swagger
├── lib/
│   └── print.js            # Utilitas untuk logging di konsol
├── resources/
│   ├── index.html          # Halaman utama
│   └── 404.html            # Halaman error 404
├── .env.example            # Contoh file environment variables
├── package.json            # Daftar dependensi dan skrip
└── vercel.json             # Konfigurasi untuk deployment Vercel
```

-----

## ⚙️ Contoh Penggunaan

Setelah server berjalan, Anda bisa mengakses beberapa *endpoint* berikut:

  - **Dokumentasi API (Swagger UI)**:
    Buka `http://localhost:1904/playground` di browser Anda untuk melihat dokumentasi interaktif dari semua *endpoint* yang tersedia.

  - **Uji Kecepatan Jaringan**:
    Akses *endpoint* berikut melalui browser atau *tool* seperti Postman:

    ```
    GET http://localhost:1904/api/tools/speedtest
    ```

    Respons yang akan diterima:

    ```json
    {
      "status": true,
      "developer": "@Liwirya",
      "result": {
        "upload": "4.2 Mbps",
        "ping": "89 ms",
        "server": "Jakarta, Jakarta, ID",
        "provider": "PT Telekomunikasi Indonesia",
        "duration": "5.3 sec",
        "time": "01/04/2024 15:30:25"
      }
    }
    ```

  - **Health Check**:
    Untuk memeriksa status API, akses:

    ```
    GET http://localhost:1904/api/health
    ```

-----

## 🤝 Kontribusi

Kontribusi sangat kami harapkan\! Jika Anda ingin berkontribusi, silakan *fork* repositori ini dan buat *pull request* dengan perubahan yang Anda usulkan. Pastikan untuk menjelaskan perubahan Anda secara rinci.

1.  *Fork* repositori ini.
2.  Buat *branch* baru (`git checkout -b fitur/NamaFitur`).
3.  Lakukan perubahan dan *commit* (`git commit -m 'Menambahkan Fitur Baru'`).
4.  *Push* ke *branch* Anda (`git push origin fitur/NamaFitur`).
5.  Buka *Pull Request*.

-----

## 📜 Lisensi

Proyek ini dilisensikan di bawah **MIT License**. Lihat file [LICENSE](https://www.google.com/search?q=LICENSE) untuk detail lebih lanjut.
