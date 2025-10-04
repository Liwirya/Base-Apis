const express = require("express");
const cors = require("cors");
const path = require("path");
const chalk = require("chalk");
const swaggerUi = require("swagger-ui-express");

const config = require("./schema/config");
const docs = require("./schema/endpoint");
const api = require("./router/api");
const anim = require("./lib/print");

const app = express();

app.use(express.json({ limit: "10mb" })); 

app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use("/api", api);
app.use(express.static(path.join(__dirname, "/resources")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use(
  "/playground",
  swaggerUi.serve,
  swaggerUi.setup(docs.swaggerDocument, docs.options),
);

app.use((req, res, next) => {
  res.status(404).send("Maaf, tidak dapat menemukan halaman tujuan!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(config.options.port, () => {
  console.log(chalk.cyan("HaewonAPIs - Base by @Liwirya"));
  anim(`Server berjalan di http://localhost:${config.options.port}`);
});