const express = require("express");
const cors = require("cors");
const path = require("path");
const chalk = require("chalk");
const swaggerUi = require("swagger-ui-express");

const config = require("./schema/config");
const docs = require("./schema/endpoint");
const api = require("./router/api");
const anim = require("./lib/print").anim;

const app = express();

app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=()");
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'none';");

  next();
});

app.use(cors({
  origin: config.options.corsOrigins || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "X-Forwarded-For"],
  credentials: true,
  maxAge: 86400,
}));

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: {
    status: false,
    message: "Too many requests from this IP, please try again later.",
    developer: config.options.developer,
  },
});
app.use(limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.static(path.join(__dirname, "/resources")));

app.use("/api", api);

app.get("/", (req, res) => {
  res.render("index");
});

app.use(
  "/playground",
  swaggerUi.serve,
  swaggerUi.setup(docs.swaggerDocument, docs.options),
);

app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Endpoint not found",
    developer: config.options.developer,
  });
});

app.use((err, req, res, next) => {
  console.error("[ERROR] ", err.stack);
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    status: false,
    message: err.message || "Internal Server Error",
    developer: config.options.developer,
    timestamp: new Date().toISOString(),
  });
});

const PORT = config.options.port || 1904;

app.listen(PORT, () => {
  console.log(chalk.cyan("HaewonAPIs - Base by @Liwirya"));
  anim(`Server berjalan di http://localhost:${PORT}`);
  console.log(chalk.green("✅ Server started successfully"));
  console.log(chalk.yellow("🌐 Swagger UI available at: /playground"));
  console.log(chalk.blue("🔧 Health check: /health"));
});

process.on("SIGINT", () => {
  console.log(chalk.magenta("🛑 Shutting down gracefully..."));
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log(chalk.magenta("🛑 Terminating process..."));
  process.exit(0);
});