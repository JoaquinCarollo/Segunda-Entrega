import { isValidID } from "../config/mongooseConfig.js";
import { convertToBoolean } from "../utils/converter.js";
import ErrorManager from "./ErrorManager.js";
import ProductModel from "../models/productsModel.js";

export default class ProductsManager {
  #productsModel;
  constructor() {
    this.#productsModel = ProductModel;
  }
  async #findProductById(pid) {
    if (!isValidID(pid)) {
      throw new ErrorManager("ID inválido", 400);
    }
    const product = await this.#productsModel.findById(pid);

    if (!product) {
      throw new ErrorManager("ID no encontrado", 404);
    }

    return product;
  }
  async getAllProducts(params) {
    try {
      const $and = [];

      if (params?.category) {
        $and.push({ category: { $regex: params.category, $options: "i" } });
      }
      const filters = $and.length > 0 ? { $and } : {};

      const sort = {
        asc: { price: 1 },
        desc: { price: -1 },
      };

      const paginationOptions = {
        limit: params?.limit || 10,
        page: params?.page || 1,
        sort: sort[params?.sort] ?? {},
        lean: true,
      };

      const products = await this.#productsModel.paginate(
        filters,
        paginationOptions
      );

      const prevPageLink = products.hasPrevPage
        ? `/api/products/?page=${products.prevPage}`
        : null;
      const nextPageLink = products.hasNextPage
        ? `/api/products/?page=${products.nextPage}`
        : null;

      return {
        docs: products.docs,
        totalDocs: products.totalDocs,
        limit: products.limit,
        totalPages: products.totalPages,
        page: products.page,
        pagingCounter: products.pagingCounter,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        prevPageLink,
        nextPageLink,
      };
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }
  async getProductById(pid) {
    try {
      return await this.#findProductById(pid);
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }
  async createProduct(data) {
    try {
      const product = await this.#productsModel.create({
        ...data,
        status: convertToBoolean(data.status),
      });

      return product;
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }
  async updateProduct(pid, data) {
    try {
      const product = await this.#findProductById(pid);
      const newValues = {
        ...product,
        ...data,
        status: data.status ? convertToBoolean(data.status) : product.status,
      };

      product.set(newValues);
      product.save();

      return product;
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }
  async deleteProduct(pid) {
    try {
      const product = await this.#findProductById(pid);

      await product.deleteOne();
    } catch (error) {
      throw ErrorManager.handleError(error);
    }
  }
}
