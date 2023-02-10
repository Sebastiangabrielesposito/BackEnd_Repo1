import { messageModel } from "../models/messages.model.js";

export default class MessagesManager {
  async createMessage(user, message) {
    try {
      const newMessage = await messageModel.create(user, message);
      return newMessage;
    } catch (error) {
      log(error);
    }
  }
}
