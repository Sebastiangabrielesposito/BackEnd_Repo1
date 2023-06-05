import {ticketModel} from '../persistencia/DAOs/mongoDB/models/ticket.model.js'
import logger from '../utils/winston/winston.js';

export async function  createTicket(ticketData) {
    try {
      const ticket = new ticketModel(ticketData);
      await ticket.save();
      return ticket;
    } catch (error) {
      logger.error("error")
    }
}

export async function getTicketById(id) {
    try {
      const ticket = await ticketModel.findById(id);
      if (!ticket) {
        logger.error("Ticket not found");
      }
      return ticket;
    } catch (error) {
      logger.error("error")
    }
}

export async function updateTicketById(_id, updateData) {
    try {
      const ticket = await ticketModel.findByIdAndUpdate(
        _id,
        updateData,
        { new: true }
      );
      if (!ticket) {
        logger.error("Ticket not found");
      }
      return ticket;
    } catch (error) {
      logger.error("error")
    }
}

export async function deleteTicketById(id) {
    try {
      const ticket = await ticketModel.findByIdAndDelete(id);
      if (!ticket) {
        logger.error("Ticket not found");
      }
      return ticket;
    } catch (error) {
      logger.error("error")
    }
  }
