import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        // default: [],
      },
      quantity: {
        type: Number,
        // default: 1,
      },
    },
  ],
  // unique: false,
});

export const cartsModel = mongoose.model("carts", cartsSchema);
