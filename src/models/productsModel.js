import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      lowercase: true,
    },
    code: {
      index: { name: "idx_code" },
      type: String,
      required: [true, "El codigo es obligatorio"],
      uppercase: true,
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio debe ser un valor positivo"],
    },
    status: {
      type: Boolean,
      required: [true, "El estado es obligatorio"],
    },
    stock: {
      type: Number,
      required: [true, "El stock es obligatorio"],
      min: [0, "El stock debe ser un valor positivo"],
    },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      uppercase: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.plugin(paginate);

const ProductModel = model("products", productSchema);

export default ProductModel;
