import {ticketModel} from '../persistencia/DAOs/mongoDB/models/ticket.model.js'

export async function  createTicket(ticketData) {
    try {
      const ticket = new ticketModel(ticketData);
      await ticket.save();
      return ticket;
    } catch (error) {
      throw new Error(error.message);
    }
}

export async function getTicketById(id) {
    try {
      const ticket = await ticketModel.findById(id);
      if (!ticket) {
        throw new Error("Ticket not found");
      }
      return ticket;
    } catch (error) {
      throw new Error(error.message);
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
        throw new Error("Ticket not found");
      }
      return ticket;
    } catch (error) {
      throw new Error(error.message);
    }
}

export async function deleteTicketById(id) {
    try {
      const ticket = await ticketModel.findByIdAndDelete(id);
      if (!ticket) {
        throw new Error("Ticket not found");
      }
      return ticket;
    } catch (error) {
      throw new Error(error.message);
    }
  }
