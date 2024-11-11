import express from "express";
import productsRoute from "./routes/productsRoute.js";
import cartsRoute from "./routes/cartsRoute.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;

app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);

app.listen(PORT, () => {
  console.log(`Ejecutándose en http://localhost:${PORT}`);
});
