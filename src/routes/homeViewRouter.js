import ProductsManager from "../managers/ProductsManager.js";
import { Router } from "express";
const homeViewRouter = Router();
const productsManager = new ProductsManager();

homeViewRouter.get("/", async (req, res) => {
  try {
    res.status(200).render("home", {});
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});

homeViewRouter.get("/realTimeProducts", async (req, res) => {
  try {
    res.status(200).render("realTimeProducts", {});
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});
export default homeViewRouter;
