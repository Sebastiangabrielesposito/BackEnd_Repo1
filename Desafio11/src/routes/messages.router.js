import { Router } from "express";
import { socketServer } from "../app.js";
import {messagesAll,msjSearch,msjCreate,msjRemoved} from '../controllers/messages.controller.js';
// import { __dirname } from "../utils.js";
// import MessagesManager from "../persistencia/dao/mongoManager/messagesManager.js";


const router = Router();


router.get("/",messagesAll)

router.get("/:messageId", msjSearch)

router.post("/", msjCreate)

router.delete("/:messageId", msjRemoved)

export default router;
