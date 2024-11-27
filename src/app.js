import express from "express";
import productsRoute from "./routes/productsRoute.js";
import homeViewRouter from "./routes/homeViewRouter.js";
import paths from "./utils/paths.js";
import { handlebarsConfig } from "./config/handlebarsConfig.js";
import { websocketConfig } from "./config/websocketConfig.js";
const app = express();
handlebarsConfig(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/public", express.static(paths.public));
const PORT = 8080;
app.use("/", homeViewRouter);
app.use("/api/products", productsRoute);

app.use("*", (req, res) => {
  res.status(404).render("error404", { title: "Error 404" });
});

const httpServer = app.listen(PORT, () => {
  console.log(`Ejecutándose en http://localhost:${PORT}`);
});

websocketConfig(httpServer);
