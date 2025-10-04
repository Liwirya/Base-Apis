# 🌐 HaewonAPIs

## Simple REST API Template with Express.js & Vercel Deployment

This repository provides a clean and minimal **REST API template** built with **Express.js**, designed for rapid development and seamless deployment on **[Vercel](https://vercel.com)**. It includes essential configuration, easy setup, and ready-to-use infrastructure for modern web applications.

> ✅ Built for speed, scalability, and simplicity — perfect for prototyping or production-ready services.

---

## 📦 Installation

To get started, clone the repository and install dependencies:

```bash
git clone https://github.com/Liwirya/BaseApis.git
cd BaseAPI
npm install
```

---

## 🚀 Running Locally

Start the server using the following command:

```bash
node .
```

The API will run on the port specified in `schema/config.js` (default: `3000`). You can access it at `http://localhost:3000`.

---

## 🔧 Configuration

Customize your API by editing the `schema/config.js` file:

```javascript
const options = {
  name: 'HaewonAPIs',          // Name of your API
  developer: '@Irull2nd',      // Your GitHub username or handle
  port: 3000,                  // Port to run the server
  webname: 'Haewon APIs',      // Website or project name
  description: 'Simple Base Rest API', // Short description
  favicon: ''                  // Optional: URL to favicon (e.g., https://example.com/favicon.ico)
};

module.exports = {
  options,
  host: {
    BASE_URL: 'https://your-domain.com' // Replace with your domain
  }
};
```

> 💡 **Note**: For Vercel deployments, ensure environment variables are set via the Vercel dashboard or `.env` file.

---

## 🛠️ Deploy to Vercel (Recommended)

Deploy your API instantly to the **AI Cloud** with zero-config CI/CD:

1. Push your code to a GitHub repository.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard).
3. Import your repo → Select `Node.js` as framework.
4. Configure environment variables if needed.
5. Click **Deploy**!

✅ **Benefits of Vercel**:
- ⚡ Instant global deployments
- 🔄 Git-connected deploys (from localhost to HTTPS in seconds)
- 🔄 Automatic rollbacks & observability
- 🤖 Native support for AI workloads via **[Vercel AI Gateway](https://vercel.com/docs/concepts/ai)**
- 🔍 Route-aware analytics and monitoring

---

## 📝 License

This project is licensed under the **MIT License**.  
See the full license in the [`LICENSE`](LICENSE) file.

> You are free to use, modify, and distribute this code, provided you include the original copyright notice.

---

## 👨‍💻 Author

Original creation by [@Irull2nd](https://github.com/Irull2nd) — Developer & Open Source Enthusiast.

> Contributions, issues, and feedback are welcome! Please open an issue or submit a pull request.

---

## 🧩 Features

- ✅ Minimalist Express.js architecture
- ✅ Ready for Vercel deployment
- ✅ Configurable via `config.js`
- ✅ Scalable for AI integrations (via Vercel AI Gateway)
- ✅ Instant rollback & observability

---

## 🌟 Why Use Vercel?

> **Build and deploy on the AI Cloud.**

Vercel provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web.

### Key Features:
- **Git-connected Deploys**  
  From localhost to HTTPS, in seconds. Deploy from Git or your CLI.

- **Collaborative Pre-production**  
  Every deploy is remarkable. Chat with your team on real, production-grade UI, not just designs.

- **Observability**  
  Route-aware observability. Monitor and analyze the performance and traffic of your projects.

  ![Analytics Dashboard](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1715229353%2Ffront%2Fhome%2Fnew%2Fgrid%2Fanalytics-small-light.png&w=750&q=75)

- **Vercel AI Gateway**  
  Deploy AI in seconds. Access all major models through a single, unified interface and shared AI credit wallet.

  ![](https://assets.vercel.com/image/upload/v1750698907/front/ai-gateway/ai-gateway-full-light.svg)

- **Instant Rollbacks**  
  Go ahead, deploy on Friday. Safely manage releases with automated deployments and instant rollbacks.

---

## 🖼️ Preview

![HaewonAPIs Logo](https://files.catbox.moe/int1gy.jpg)

---

Happy coding! 🚀