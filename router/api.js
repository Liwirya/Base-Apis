const express = require("express");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const config = require("../schema/config");
const tools = require("../scrapers/tools.js");

const { developer: dev } = config.options;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "https://discord.com/api/webhooks/1424134853502308453/MysoAxFaXtd94iBGBhqCa3tDUb0yYrxOZ0ZEATN76-NAj1iw3X30-FHjU0Az9jaJz8CR ";

if (!DISCORD_WEBHOOK_URL) {
  console.warn("⚠️ Discord webhook not configured. No logs will be sent.");
}

const messages = {
  error: {
    status: 404,
    developer: dev,
    result: "Error, Service Unavailable",
  },
  notRes: {
    status: 404,
    developer: dev,
    result: "Error, Invalid JSON Result",
  },
  query: {
    status: 400,
    developer: dev,
    result: "Please input parameter query!",
  },
  url: {
    status: 400,
    developer: dev,
    result: "Please input parameter URL!",
  },
  notUrl: {
    status: 404,
    developer: dev,
    result: "Error, Invalid URL",
  },
};

const validateQuery = (req, res, next) => {
  const { query } = req.query;
  if (!query) {
    return res.status(messages.query.status).json(messages.query);
  }
  next();
};

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const getRealIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim(); 
  }

  const socket = req.socket;
  if (socket && socket.remoteAddress) {
    return socket.remoteAddress;
  }

  return req.ip || req.connection.remoteAddress || req.socket.remoteAddress || "unknown";
};

const sendDiscordLog = async (data) => {
  if (!DISCORD_WEBHOOK_URL) return;

  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: null,
      embeds: [
        {
          title: "🔐 API Access Detected",
          color: data.status === "error" ? 0xff0000 : data.status === "success" ? 0x00ff9d : 0x00c7ff,
          fields: [
            { name: "IP Address", value: data.ip, inline: true },
            { name: "Method", value: data.method, inline: true },
            { name: "Endpoint", value: data.endpoint, inline: true },
            { name: "Status", value: data.status, inline: true },
            { name: "Time", value: new Date().toISOString(), inline: true },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: `HaewonAPIs | ${dev}`,
          },
        },
      ],
    });
  } catch (err) {
    console.error("❌ Failed to send log to Discord:", err.message);
  }
};

const bannedIps = [
  "127.0.0.1",
  "0.0.0.0",
  "localhost",
  "192.168.1.100",
  "192.168.0.1",
  "10.0.0.1",
];

const sanitizeInput = (str) => {
  if (typeof str !== "string") return str;
  return str.replace(/[<>"'&]/g, ""); 
};

router.get("/tools/speedtest", async (req, res) => {
  try {
    const ip = getRealIp(req); 
    const method = req.method;
    const endpoint = req.url;
    const query = sanitizeInput(req.query.query);

    if (bannedIps.includes(ip)) {
      await sendDiscordLog({
        ip,
        method,
        endpoint,
        status: "blocked",
        reason: "Banned IP",
      });
      return res.status(403).json({
        status: false,
        message: "Access denied due to banned IP.",
        developer: dev,
      });
    }

    await sendDiscordLog({
      ip,
      method,
      endpoint,
      status: "request",
      query,
    });

    console.log(`[REQUEST] ${new Date().toISOString()} - ${method} ${endpoint}`);

    if (query && !["upload", "ping"].includes(query)) {
      await sendDiscordLog({
        ip,
        method,
        endpoint,
        status: "invalid_query",
        query,
      });
      return res.status(400).json({
        status: false,
        message: "Invalid query parameter. Use 'upload' or 'ping'.",
        developer: dev,
      });
    }

    const result = await tools.speedtest(query);

    if (!result || typeof result !== "object") {
      throw new Error("Invalid response format from speedtest service");
    }

    res.status(200).json({
      status: true,
      developer: dev,
      result: result,
    });

    await sendDiscordLog({
      ip,
      method,
      endpoint,
      status: "success",
      query,
    });

    console.log(`[SUCCESS] Speed test completed at ${new Date().toISOString()}`);
  } catch (error) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${req.url}:`, error.message);

    const statusCode = error.response?.status || 500;
    const errorMessage = error.message || "Internal Server Error";

    await sendDiscordLog({
      ip,
      method,
      endpoint,
      status: "error",
      error: errorMessage,
    });

    res.status(statusCode).json({
      status: false,
      message: errorMessage,
      developer: dev,
    });
  }
});

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "API Gateway",
    uptime: process.uptime(),
  });
});

router.use("*", (req, res) => {
  res.status(404).json({
    status: false,
    message: "Endpoint not found",
    developer: dev,
  });
});

module.exports = router;