import { Router } from "express";
import CartManager from "../managers/CartManager.js";
const cartRoute = Router();
const cartManager = new CartManager();
cartRoute.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts(req.query);
    res.status(200).json({ status: "success", playload: carts });
  } catch (error) {
    res.status(error.code).json({ status: "error", message: error.message });
  }
});
cartRoute.get("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params?.cid);
    res.status(200).json({ status: "success", playload: cart });
  } catch (error) {
    res.status(error.code).json({ status: "error", message: error.message });
  }
});
cartRoute.get("/:cid/products/:pid", async (req, res) => {
  try {
    const cartProduct = await cartManager.getCartProduct(
      req.params.cid,
      req.params.pid
    );
    res.status(200).json({ status: "success", playload: cartProduct });
  } catch (error) {
    res.status(error.code).json({ status: "error", message: error.message });
  }
});
cartRoute.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart(req.body);
    res.status(201).json({ status: "success", playload: cart });
  } catch (error) {
    res.status(error.code).json({ status: "error", message: error.message });
  }
});
cartRoute.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.addProduct(cid, pid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});
cartRoute.put("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.updateCart(req.params.cid, req.body);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(error.code).json({ status: "error", message: error.message });
  }
});
cartRoute.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await cartManager.updateProduct(cid, pid, { quantity });
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(error.code).json({ status: "error", message: error.message });
  }
});
cartRoute.delete("/:cid", async (req, res) => {
  try {
    await cartManager.deleteCart(req.params.cid);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(error.code).json({ status: "error", message: error.message });
  }
});
cartRoute.delete("/:cid/products/:pid", async (req, res) => {
  try {
    await cartManager.deleteProduct(req.params.cid, req.params.pid);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(error.code).json({ status: "error", message: error.message });
  }
});

export default cartRoute;
