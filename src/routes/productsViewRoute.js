import ProductsManager from "../managers/ProductsManager.js";
import { Router } from "express";
const productsViewRoute = Router();
const productsManager = new ProductsManager();

productsViewRoute.get("/", async (req, res) => {
  try {
    const products = await productsManager.getAllProducts();
    res.status(200).render("home", { products });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});

export default productsViewRoute;
