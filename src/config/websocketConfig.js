import { Server } from "socket.io";
import ProductsManager from "../managers/ProductsManager.js";

const productsManager = new ProductsManager();

export const websocketConfig = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", async (socket) => {
    socketServer.emit("productsList", {
      products: await productsManager.getAllProducts(),
    });
    socket.on("createProduct", async (data) => {
      try {
        await productsManager.createProduct(data);
        socketServer.emit("productsList", {
          products: await productsManager.getAllProducts(),
        });
      } catch (error) {
        socketServer.emit("errorMessage", {
          message: error.message,
        });
      }
    });
    socket.on("deleteProduct", async (data) => {
      try {
        await productsManager.deleteProduct(Number(data.id));
        socketServer.emit("productsList", {
          products: await productsManager.getAllProducts(),
        });
      } catch (error) {
        socketServer.emit("errorMessage", {
          message: error.message,
        });
      }
    });
  });
};
