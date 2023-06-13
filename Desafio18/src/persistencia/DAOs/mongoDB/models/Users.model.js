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
  role: {
    type: String,
    enum: ["user", "admin", "premium"],
    default: "user",
  },
  documents: [
    {
      name: {
        type: String,
      },

      reference: {
        type: String,
      },
    },
  ],
  last_connection: {
    type: Date,
  },
  img_profile: {
    data:Buffer,
    contentType: String,
    reference:String
  }
});

export const usersModel = mongoose.model("Users", usersSchema);