const axios = require("axios");
const fetch = require("node-fetch");
const fs = require("fs").promises;
const path = require("path");

exports.speedtest = async () => {
  const startTime = Date.now();

  let uploadSpeed = 0;
  let ping = 0;
  let networkInfo = { location: "N/A", org: "N/A" };

  try {
    const url = "https://speed.cloudflare.com/__up ";
    const data = "0".repeat(5 * 1024 * 1024);
    const startUpload = Date.now();

    const response = await axios.post(url, data, {
      headers: { "Content-Length": data.length },
      timeout: 30000,
    });

    const uploadDuration = (Date.now() - startUpload) / 1000; 
    if (response.status === 200 && uploadDuration > 0) {
      uploadSpeed = data.length / uploadDuration; 
    }
  } catch (e) {
    console.error("[UPLOAD TEST ERROR]:", e.message);
    throw new Error(`Upload test gagal: ${e.message}`);
  }

  try {
    const startPing = Date.now();
    await axios.get("https://www.google.com ", { timeout: 10000 });
    ping = Date.now() - startPing; // ms
  } catch (e) {
    console.warn("[PING TEST ERROR]:", e.message);
    ping = 0;
  }

  try {
    const response = await axios.get("https://ipinfo.io/json ", { timeout: 10000 });
    if (response.status === 200) {
      const data = response.data;
      networkInfo.location = `${data.city || "N/A"}, ${data.region || "N/A"}, ${data.country || "N/A"}`;
      networkInfo.org = (data.org || "N/A").replace(/^AS\d+\s*/, "");
    }
  } catch (e) {
    console.warn("[GEOIP TEST ERROR]:", e.message);
    networkInfo = { location: "N/A", org: "N/A" };
  }

  const formatSpeed = (bytesPerSec) => {
    if (bytesPerSec <= 0) return "0 Mbps";
    const mbits = (bytesPerSec * 8) / (1024 * 1024);
    return mbits >= 1 ? `${mbits.toFixed(1)} Mbps` : `${(mbits * 1000).toFixed(1)} Kbps`;
  };

  return {
    upload: formatSpeed(uploadSpeed),
    ping: `${ping} ms`,
    server: networkInfo.location,
    provider: networkInfo.org,
    duration: `${((Date.now() - startTime) / 1000).toFixed(1)} sec`,
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