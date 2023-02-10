import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  product: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

export const cartsModel = mongoose.model("carts", cartsSchema);
