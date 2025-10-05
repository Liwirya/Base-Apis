const axios = require("axios");
const fetch = require("node-fetch");
const fs = require("fs").promises;
const path = require("path");

const config = {
  maxRetries: 3,
  retryDelay: 1000, 
  timeout: 30000, 
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Cache-Control": "max-age=0",
  },
};

const blockedDomains = [
  "httpbin.org",
  "postman-echo.com",
  "reqres.in",
  "jsonplaceholder.typicode.com",
];

const retryRequest = async (fn, retries = config.maxRetries, delay = config.retryDelay) => {
  for (let i = 0; i <= retries; i++) {
    try {
      const result = await fn();
      return result;
    } catch (err) {
      if (i === retries) throw err;
      console.warn(`Retry attempt ${i + 1} failed:`, err.message);
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

const fetchWithProxy = async (url, options = {}) => {
  const proxy = process.env.HTTP_PROXY || process.env.https_proxy;
  if (proxy) {
    return fetch(url, { ...options, agent: new (require('https-proxy-agent'))(proxy) });
  }
  return fetch(url, options);
};

const uploadTest = async () => {
  const url = "https://speed.cloudflare.com/__up";
  const data = "0".repeat(5 * 1024 * 1024); 
  const startUpload = Date.now();

  try {
    const response = await retryRequest(async () => {
      const res = await axios.post(url, data, {
        headers: {
          ...config.headers,
          "Content-Length": data.length,
          "X-Requested-With": "XMLHttpRequest",
        },
        timeout: config.timeout,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      if (res.status !== 200) {
        throw new Error(`HTTP ${res.status}`);
      }

      return {
        duration: (Date.now() - startUpload) / 1000,
        size: data.length,
      };
    });

    const { duration, size } = response;
    if (duration > 0) {
      return size / duration; 
    }
    return 0;
  } catch (e) {
    console.error("[UPLOAD TEST ERROR]:", e.message);
    throw new Error(`Upload test gagal: ${e.message}`);
  }
};

const pingTest = async () => {
  const url = "https://www.google.com";

  try {
    const startPing = Date.now();
    await retryRequest(async () => {
      await axios.get(url, {
        timeout: 10000,
        headers: config.headers,
      });
    });
    return Date.now() - startPing; 
  } catch (e) {
    console.warn("[PING TEST ERROR]:", e.message);
    return 0;
  }
};

const geoipTest = async () => {
  const url = "https://ipinfo.io/json";

  try {
    const response = await retryRequest(async () => {
      const res = await axios.get(url, {
        timeout: 10000,
        headers: config.headers,
      });

      if (res.status !== 200) {
        throw new Error(`HTTP ${res.status}`);
      }

      return res.data;
    });

    return {
      location: `${response.city || "N/A"}, ${response.region || "N/A"}, ${response.country || "N/A"}`,
      org: (response.org || "N/A").replace(/^AS\d+\s*/, ""),
    };
  } catch (e) {
    console.warn("[GEOIP TEST ERROR]:", e.message);
    return { location: "N/A", org: "N/A" };
  }
};

const formatSpeed = (bytesPerSec) => {
  if (bytesPerSec <= 0) return "0 Mbps";
  const mbits = (bytesPerSec * 8) / (1024 * 1024);
  return mbits >= 1 ? `${mbits.toFixed(1)} Mbps` : `${(mbits * 1000).toFixed(1)} Kbps`;
};

exports.speedtest = async () => {
  const startTime = Date.now();

  let uploadSpeed = 0;
  let ping = 0;
  let networkInfo = { location: "N/A", org: "N/A" };

  try {
    const [uploadResult, pingResult, geoipResult] = await Promise.all([
      uploadTest(),
      pingTest(),
      geoipTest(),
    ]);

    uploadSpeed = uploadResult;
    ping = pingResult;
    networkInfo = geoipResult;

  } catch (error) {
    console.error("[SPEEDTEST FAILED]:", error.message);
    uploadSpeed = 0;
    ping = 0;
    networkInfo = { location: "N/A", org: "N/A" };
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  return {
    upload: formatSpeed(uploadSpeed),
    ping: `${ping} ms`,
    server: networkInfo.location,
    provider: networkInfo.org,
    duration: `${duration} sec`,
    time: new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta"
    }).replace(/,/g, "")
  };
};