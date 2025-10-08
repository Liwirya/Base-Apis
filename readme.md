<h1 align="center">🌐 HaewonAPIs</h1>

<p align="center">
  <img src="https://files.catbox.moe/int1gy.jpg" alt="HaewonAPIs Thumbnail" width="300" />
</p>

<p align="center">
  A lightweight and modular REST API built with <strong>Express.js</strong>, perfect untuk kamu yang pengen cepet develop & gampang deploy di <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a>.<br/>
  Asik buat project personal, AI integration, ataupun backend service lainnya.
</p>

---

<h2>🔧 Tech Stack</h2>

| Technology  | Icon                                                                                                           |
|-------------|----------------------------------------------------------------------------------------------------------------|
| HTML5       | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)              |
| CSS3        | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)                  |
| JavaScript  | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)|
| Node.js     | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)          |

---

<h2>📦 Installation</h2>

Mulai dengan clone repo ini, terus install dependencies-nya:

```
git clone https://github.com/Liwirya/Base-Apis.git
cd Base-Apis
npm install
```

---

<h2>🚀 Running Locally</h2>

Mau nyalain server? Pakai perintah ini:

```
node index
```

API bakal jalan di port yang udah disetting di `schema/config.js` (default: `1904`). Akses aja di `http://localhost:1904`.

---

<h2>🔧 Configuration</h2>

Buat custom API kamu, edit aja `schema/config.js`:

```
const options = {
  name: "HaewonAPIs",           // Ganti terserah kamu
  developer: "@Liwirya",        // Nama kamu juga boleh
  port: 1904,                   // Bebas portnya
  webName: "HaewonAPIs Playground", // Nama website bebas
  description: "Rest APIs",     // Deskripsi bebas
  favicon: "https://files.catbox.moe/int1gy.jpg", // URL foto bebas
};

const host = {
  BASE_URL: "http://localhost:1904", // Ganti sesuai URL kamu
  // Contoh: https://haewonapis.vercel.app
};

module.exports = {
  options,
  host,
};
```

---

<h2>🛠️ Development</h2>

### Run pakai Nodemon biar auto-restart:

```
npm install -g nodemon
nodemon index
```

### Environment Variables

Buat data sensitif di `.env` file:

```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/1234567890/abcdefg...
PORT=1904
NODE_ENV=development
```

---

<h2>📂 Project Structure</h2>

```
Base-Apis/
├── index.js
├── schema/
│   ├── config.js
│   └── endpoint.js
├── router/
│   └── api.js
├── scrapers/
│   └── tools.js
├── lib/
│   └── print.js
├── resources/
│   └── index.html
└── package.json
```

---

<h2>📎 License</h2>

MIT © 2025 Liwirya

---

<h2>💬 Contact</h2>

- 🧑‍💻 GitHub: <a href="https://github.com/Liwirya" target="_blank" rel="noopener noreferrer">github.com/Liwirya</a>
