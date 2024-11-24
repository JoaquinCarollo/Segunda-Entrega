import express from "express";
import productsRoute from "./routes/productsRoute.js";
import productsViewRoute from "./routes/productsViewRoute.js";
import paths from "./utils/paths.js";
import { handlebarsConfig } from "./config/handlebarsConfig.js";
const app = express();
handlebarsConfig(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/public", express.static(paths.public));
const PORT = 8080;
app.use("/", productsViewRoute);
app.use("/api/products", productsRoute);

app.listen(PORT, () => {
  console.log(`Ejecutándose en http://localhost:${PORT}`);
});
