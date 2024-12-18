import { Router } from "express";
import CartsManager from "../managers/CartManager.js";

const cartManager = new CartsManager();
const cartViewRouter = Router();

cartViewRouter.get("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params?.cid);
    const cartProducts = cart.products;
    const listOfProducts = [];
    for (let i = 0; i < cartProducts.length; i++) {
      const productTitle = cartProducts[i].product.title;
      const productQuantity = cartProducts[i].quantity;
      listOfProducts.push({ title: productTitle, quantity: productQuantity });
    }
    res.status(200).render("cart", { listOfProducts });
  } catch (error) {
    res.status(error.code).json({ status: "error", message: error.message });
  }
});
export default cartViewRouter;
