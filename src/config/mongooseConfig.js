import { connect, Types } from "mongoose";
import CartModel from "../models/cartModel.js";
import ProductModel from "../models/productsModel.js";
export const connectDB = async () => {
  try {
    await connect(
      "mongodb+srv://Cluster0:54321@cluster0.f1rcl.mongodb.net/TerceraEntrega"
    );

    console.log("Conexión realizada con éxito");
  } catch (error) {
    console.log("Error: " + error.message);
  }
};

export const isValidID = (id) => {
  return Types.ObjectId.isValid(id);
};
