import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  full_name: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Carts" }],
  },
  // cart: {
  //   type: [{
  //     producto: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "products",
  //     },
  //     quantity: {
  //       type: Number,
  //       default: 1,
  //     },
  //   }],
  // },
  role: {
    type: String,
    enum: ["user", "admin", "premium"],
    default: "user",
  },
  documents: [
    {
    name: { type: String, required: true },
    reference: { type: String, required: true },
  }
  ],
  last_connection: {
    type: Date,
  },
  img_profile: {
    data: Buffer,
    contentType: String,
    reference: String,
  },
  img_products:[
    {
    data:String,
    },
  ] 
});

export const usersModel = mongoose.model("Users", usersSchema);
