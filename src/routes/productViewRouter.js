import ProductsManager from "../managers/ProductsManager.js";
import { Router } from "express";
const productViewRouter = Router();

const productsManager = new ProductsManager();
productViewRouter.get("/:pid", async (req, res) => {
  try {
    const product = await productsManager.getProductById(req.params.pid);
    const productName = product.title;
    const productDescription = product.description;
    const productPrice = product.price;
    const productStock = product.stock;
    const productCode = product.code;
    const productId = product._id;
    const productCategory = product.category;
    res.status(200).render("product", {
      productName,
      productDescription,
      productPrice,
      productStock,
      productCategory,
      productCode,
      productId,
    });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});
export default productViewRouter;
