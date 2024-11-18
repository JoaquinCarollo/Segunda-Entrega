import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import paths from "../utils/paths.js";
import ErrorManager from "./ErrorManager.js";

export default class CartsManager {
  #jsonFileName;
  #carts;
  constructor() {
    this.#jsonFileName = "carts.json";
  }
  async $findCartById(cid) {
    this.#carts = await readJsonFile(paths.files, this.#jsonFileName);
    const cartFound = this.#carts.find((cart) => cart.id === Number(cid));
    if (!cartFound) {
      throw new ErrorManager("Error, carrito no encontrado", 404);
    }
    return cartFound;
  }
  async getAllCarts() {
    try {
      this.#carts = await readJsonFile(paths.files, this.#jsonFileName);
      return this.#carts;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }
  async getCartById(cid) {
    try {
      const cartFound = await this.$findCartById(cid);
      return cartFound;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }
  async createCart(data) {
    try {
      const products = data?.products?.map((item) => {
        return { product: Number(item.product), quantity: 1 };
      });
      const cart = {
        id: generateId(await this.getAllCarts()),
        products: products ?? [],
      };
      this.#carts.push(cart);
      await writeJsonFile(paths.files, this.#jsonFileName, this.#carts);
      return cart;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }
  async addProduct(cid, pid) {
    try {
      const cartFound = await this.$findCartById(cid);
      const productIndex = cartFound.products.findIndex(
        (item) => item.product === Number(pid)
      );

      if (productIndex >= 0) {
        cartFound.products[productIndex].quantity++;
      } else {
        cartFound.products.push({ product: Number(pid), quantity: 1 });
      }

      const indexCart = this.#carts.findIndex(
        (item) => item.id === Number(cid)
      );
      this.#carts[indexCart] = cartFound;
      await writeJsonFile(paths.files, this.#jsonFileName, this.#carts);

      return cartFound;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }
}
