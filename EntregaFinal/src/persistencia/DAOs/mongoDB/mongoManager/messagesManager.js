import { messageModel } from "../models/messages.model.js";
import logger from '../../../../utils/winston/winston.js';

export default class MessagesManager {
  async getAll() {
    try {
      const mensajes = await messageModel.find();
      return mensajes;
    } catch (error) {
      logger.error("error");
    }
  }

  async createMessage(obj) {
    try {
      const newMessage = await messageModel.create(obj);
      return newMessage;
    } catch (error) {
      logger.error("error");
    }
  }

  async searchMessage(id) {
    try {
      const messageSearch = await messageModel.findById(id);
      return messageSearch;
    } catch (error) {
      logger.error("error");
    }
  }
  async deleteMessage(id) {
    try {
      const messageDelete = await messageModel.findByIdAndDelete(id);
      return messageDelete;
    } catch (error) {
      logger.error("error");
    }
  }
}
