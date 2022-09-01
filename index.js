import express from "express";
import cors from "cors";
import helmet from "helmet";
import setRoutes from "./startup/routes.js";
import setConfig from "./startup/config.js";

process.on("uncaughtException", (ex) => {
  console.log(ex);

  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  console.log(ex);

  process.exit(1);
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

setRoutes(app);
setConfig(app);
