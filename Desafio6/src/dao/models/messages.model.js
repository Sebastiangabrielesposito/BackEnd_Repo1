import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: {
    type: "string",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const messageModel = mongoose.model("messages", messageSchema);
