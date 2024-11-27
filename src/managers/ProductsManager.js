import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import paths from "../utils/paths.js";
import { convertToBoolean } from "../utils/converter.js";
import ErrorManager from "./ErrorManager.js";

export default class ProductsManager {
  #jsonFileName;
  #products;
  constructor() {
    this.#jsonFileName = "products.json";
  }
  async $findProductById(pid) {
    this.#products;
    const productFound = this.#products.find(
      (product) => product.id === Number(pid)
    );
    if (!productFound) {
      throw new ErrorManager("Error, producto no encontrado", 404);
    }
    return productFound;
  }
  async getAllProducts() {
    try {
      this.#products = await readJsonFile(paths.files, this.#jsonFileName);
      return this.#products;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }
  async getProductById(pid) {
    try {
      const productFound = await this.$findProductById(pid);
      return productFound;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }
  async createProduct(data) {
    try {
      let { title, description, code, price, status, stock, category } = data;
      if (!title || !description || !code || !price || !stock || !category) {
        throw new ErrorManager("Error, faltan datos obligatorios", 400);
      }
      if (!status) {
        status = true;
      }
      const product = {
        id: generateId(await this.getAllProducts()),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
      };
      this.#products.push(product);
      await writeJsonFile(paths.files, this.#jsonFileName, this.#products);
      return product;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }
  async updateProduct(pid, data) {
    try {
      const { title, description, code, price, status, stock, category } = data;
      const productFound = await this.$findProductById(pid);

      const product = {
        id: productFound.id,
        title: title || productFound.title,
        description: description || productFound.description,
        code: code || productFound.code,
        price: price ? Number(price) : productFound.price,
        status: status ? convertToBoolean(status) : productFound.status,
        stock: stock ? Number(stock) : productFound.stock,
        category: category || productFound.category,
      };
      const indexProduct = this.#products.findIndex(
        (product) => product.id === Number(pid)
      );
      this.#products[indexProduct] = product;
      await writeJsonFile(paths.files, this.#jsonFileName, this.#products);
      return product;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }
  async deleteProduct(pid) {
    try {
      const indexProduct = this.#products.findIndex(
        (product) => product.id === Number(pid)
      );
      if (indexProduct < 0) {
        throw new ErrorManager("Error, el producto a eliminar no existe", 400);
      }
      this.#products.splice(indexProduct, 1);
      await writeJsonFile(paths.files, this.#jsonFileName, this.#products);
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }
}
