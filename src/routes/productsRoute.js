import { Router } from "express";
import ProductsManager from "../managers/ProductsManager.js";
const productsRoute = Router();

const productsManager = new ProductsManager();
productsRoute.get("/", async (req, res) => {
  try {
    const products = await productsManager.getAllProducts();
    res.status(200).json({ status: "success", playload: products });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});
productsRoute.get("/:pid", async (req, res) => {
  try {
    const product = await productsManager.getProductById(req.params?.pid);
    res.status(200).json({ status: "success", playload: product });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});
productsRoute.post("/", async (req, res) => {
  try {
    const product = await productsManager.createProduct(req.body);
    res.status(201).json({ status: "success", playload: product });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});
productsRoute.put("/:pid", async (req, res) => {
  try {
    const product = await productsManager.updateProduct(
      req.params?.pid,
      req.body
    );
    res.status(200).json({ status: "success", playload: product });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});
productsRoute.delete("/:pid", async (req, res) => {
  try {
    await productsManager.deleteProduct(req.params?.pid);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});

export default productsRoute;
