# 🌐 HaewonAPIs

> A lightweight and modular REST API built with **Express.js**, designed for fast development and seamless deployment on **[Vercel](https://vercel.com)**.  
> Perfect for personal projects, AI integrations, or backend services.

![HaewonAPIs Thumbnail](https://files.catbox.moe/int1gy.jpg)

---

## 🔧 Tech Stack

| Technology | Icon |
|-----------|------|
| HTML5     | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) |
| CSS3      | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) |
| JavaScript| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) |
| Node.js   | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) |

---

## 📦 Installation

To get started, clone the repository and install dependencies:

```bash
git clone https://github.com/Liwirya/Base-Apis.git
cd Base-Apis
npm install
```

---

## 🚀 Running Locally

Start the server using the following command:

```bash
node index
```

The API will run on the port specified in `schema/config.js` (default: `1904`). You can access it at `http://localhost:1904`.

---

## 🔧 Configuration

Customize your API by editing the `schema/config.js` file:

```javascript
const options = {
  name: "HaewonAPIs", // Ganti dengan nama bebas
  developer: "@Liwirya", // Ganti dengan nama bebas
  port: 1904, // Ganti dengan port bebas
  webName: "HaewonAPIs Playground", // Ganti dengan nama bebas
  description: "Rest APIs", // Ganti dengan deskripsi bebas
  favicon: "https://files.catbox.moe/int1gy.jpg", // Ganti dengan URL foto bebas
};

const host = {
  BASE_URL: "http://localhost:1904", // Ganti dengan URL yang sesuai
  // Contoh: https://haewonapis.vercel.app
};

module.exports = {
  options,
  host,
};
```

---

## 🛠️ Development

### ✅ Run with Nodemon (Auto-restart)
```bash
npm install -g nodemon
nodemon index
```

### ✅ Environment Variables
Create a `.env` file for sensitive data:

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/1234567890/abcdefg...
PORT=1904
NODE_ENV=development
```

---

## 📂 Project Structure

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

## 📎 License

MIT © 2025 Liwirya

---

## 💬 Contact

- 📧 Email: wiraliwirya@gmail.com
- 🌐 Website: [https://www.hitam.live](https://www.hitam.live)
- 📱 WhatsApp: [wa.me/6283879152564](https://wa.me/6283879152564)
- 🐦 Twitter: [@liwiryawira](https://twitter.com/liwiryawira)
- 📷 Instagram: [@liwiryawira](https://instagram.com/mynameisliwirya)
- 🧑‍💻 GitHub: [github.com/Liwirya](https://github.com/Liwirya)