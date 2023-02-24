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
});
cartsSchema.pre("findOne", function (next) {
  this.populate("products.producto");
  next();
});
export const cartsModel = mongoose.model("carts", cartsSchema);
