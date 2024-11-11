import { Router } from "express";
import CartManager from "../managers/CartManager.js";
const cartsRoute = Router();
const cartManager = new CartManager();
cartsRoute.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts();
    res.status(200).json({ status: "success", playload: carts });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});
cartsRoute.get("/:pid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params?.pid);
    res.status(200).json({ status: "success", playload: cart });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});
cartsRoute.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart(req.body);
    res.status(201).json({ status: "success", playload: cart });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});
cartsRoute.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await cartManager.addProduct(cid, pid, quantity || 1);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});
export default cartsRoute;
