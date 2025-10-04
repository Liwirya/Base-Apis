const express = require("express");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const config = require("../schema/config");
const tools = require("../scrapers/tools.js");
const { developer: dev } = config.options;

// Log Info
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

router.get("/tools/speedtest", async (req, res) => {
  try {
    const result = await tools.speedtest();
    res.json({
      status: true,
      developer: dev,
      result: result
    });
  } catch (error) {
    console.error("[SPEEDTEST API ERROR]:", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
      developer: dev
    });
  }
});

module.exports = router;
