import ProductsManager from "../managers/ProductsManager.js";
import { Router } from "express";
const homeViewRouter = Router();
const productsManager = new ProductsManager();

homeViewRouter.get("/", async (req, res) => {
  try {
    const products = await productsManager.getAllProducts(req.query);
    const product = products.docs;
    const productsPages = products.page;
    const productsTotalPages = products.totalPages;
    const productList = product;
    for (let i = 0; i < product.length; i++) {
      const linkProduct = `http://localhost:8080/product/${product[i]._id}`;
      productList[i] = {
        ...productList[i],
        linkProduct,
      };
    }
    res.status(200).render("home", { productList, productsPages });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});
export default homeViewRouter;
