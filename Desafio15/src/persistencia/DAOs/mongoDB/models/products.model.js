import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  thumbnails: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'users',
    // default:"admin"
    // required: true,
  },
});
productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model("products", productSchema);
