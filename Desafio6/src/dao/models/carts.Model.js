import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      default: [],
    },
  ],
});

export const cartsModel = mongoose.model("carts", cartsSchema);
