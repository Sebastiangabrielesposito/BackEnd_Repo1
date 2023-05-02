import { messageModel } from "../models/messages.model.js";

export default class MessagesManager {
  async getAll() {
    try {
      const mensajes = await messageModel.find();
      return mensajes;
    } catch (error) {
      console.log(error);
    }
  }

  async createMessage(obj) {
    try {
      const newMessage = await messageModel.create(obj);
      return newMessage;
    } catch (error) {
      console.log(error);
    }
  }

  async searchMessage(id) {
    try {
      const messageSearch = await messageModel.findById(id);
      return messageSearch;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteMessage(id) {
    try {
      const messageDelete = await messageModel.findByIdAndDelete(id);
      return messageDelete;
    } catch (error) {
      console.log(error);
    }
  }
}
