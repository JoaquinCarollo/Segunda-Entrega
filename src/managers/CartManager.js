import { isValidID } from "../config/mongooseConfig.js";
import CartModel from "../models/cartModel.js";
import ErrorManager from "./ErrorManager.js";

export default class CartsManager {
  #cartModel;
  constructor() {
    this.#cartModel = CartModel;
  }
  async #findCartById(cid) {
    if (!isValidID(cid)) {
      throw new ErrorManager("ID inválido", 400);
    }
    const cart = await this.#cartModel
      .findById(cid)
      .populate("products.product");

    if (!cart) {
      throw new ErrorManager("ID no encontrado", 404);
    }

    return cart;
  }
  async getAllCarts(params) {
    try {
      const paginationOptions = {
        limit: params?.limit || 10,
        page: params?.page || 1,
        populate: "products.product",
        lean: true,
      };

      return await this.#cartModel.paginate({}, paginationOptions);
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }
  async getCartById(cid) {
    try {
      return await this.#findCartById(cid);
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }
  async getCartProduct(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      const productFound = cart.products.findIndex(
        (item) => item.product._id == pid
      );
      const cartProduct = cart.products[productFound];
      return cartProduct;
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }
  async createCart(data) {
    try {
      const cart = await this.#cartModel.create(data);
      return cart;
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }
  async addProduct(cid, pid) {
    try {
      const cart = await this.#findCartById(cid);
      const productIndex = cart.products.findIndex(
        (item) => item.product._id.toString() === pid
      );

      if (productIndex >= 0) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }

      await cart.save();

      return cart;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }
  async updateProduct(cid, pid, data) {
    try {
      const cart = await this.#findCartById(cid);
      const productIndex = cart.products.findIndex(
        (item) => item.product._id.toString() === pid
      );
      if (productIndex === -1) {
        throw new ErrorManager("Producto no encontrado en el carrito", 404);
      }
      cart.products[productIndex].quantity = data.quantity;
      cart.save();
      return cart;
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }
  async updateCart(cid, products) {
    try {
      const cart = await this.#findCartById(cid);

      if (!Array.isArray(products)) {
        throw new ErrorManager(
          "El formato de productos debe ser un arreglo",
          400
        );
      }

      cart.products = products.map((item) => {
        if (!item.product || !item.quantity) {
          throw new ErrorManager(
            "Cada producto debe incluir 'product' y 'quantity'",
            400
          );
        }
        return {
          product: item.product,
          quantity: item.quantity,
        };
      });

      await cart.save();

      return cart;
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }

  async deleteProduct(cid, pid) {
    try {
      const cart = await this.#findCartById(cid);

      const productIndex = cart.products.findIndex(
        (item) => item.product._id.toString() === pid
      );

      if (productIndex === -1) {
        throw new ErrorManager("Producto no encontrado en el carrito", 404);
      }

      cart.products.splice(productIndex, 1);

      await cart.save();

      return cart;
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }
  async deleteCart(cid) {
    try {
      const cart = await this.#findCartById(cid);
      await cart.deleteOne();
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }
}
