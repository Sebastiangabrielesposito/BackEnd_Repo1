import MessagesManager from "../persistencia/DAOs/mongoDB/mongoManager/messagesManager.js";
import { __dirname } from "../utils.js";
import logger from '../utils/winston/winston.js';

const messagesManager = new MessagesManager();

export async function getMessagesAll(){
    try{
        const messages = await messagesManager.getAll()
        return messages
    }catch(error){
        logger.error("error");
    }
}

export async function messageCreate(obj){
    try{
        const newMessage = await messagesManager.createMessage(obj)
        return newMessage
    }catch(error){
        logger.error("error");
    }
}

export async function messageSearch(id){
    try{
        const searchMsn = await messagesManager.searchMessage(id)
        return searchMsn
    }catch(error){
        logger.error("error");
    }
}

export async function deleteMsj(id){
    try{
        const msnDelete = await messagesManager.deleteMessage(id)
        return msnDelete
    }catch(error){
        logger.error("error");
    }
}