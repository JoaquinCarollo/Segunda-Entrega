import express from "express";
import cartRoute from "./routes/cartsRoute.js";
import productsRoute from "./routes/productsRoute.js";
import homeViewRouter from "./routes/homeViewRouter.js";
import productViewRouter from "./routes/productViewRouter.js";
import cartViewRouter from "./routes/cartViewRouter.js";
import { handlebarsConfig } from "./config/handlebarsConfig.js";
import { websocketConfig } from "./config/websocketConfig.js";
import { connectDB } from "./config/mongooseConfig.js";
const app = express();
connectDB();
handlebarsConfig(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/public", express.static("./src/public"));
const PORT = 8080;
app.use("/", homeViewRouter);
app.use("/product", productViewRouter);
app.use("/cart", cartViewRouter);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);

app.use("*", (req, res) => {
  res.status(404).render("error404", { title: "Error 404" });
});

const httpServer = app.listen(PORT, () => {
  console.log(`Ejecutándose en http://localhost:${PORT}`);
});

websocketConfig(httpServer);
