import { Router } from "express";
import { __dirname } from "../utils.js";
import { socketServer } from "../app.js";
import MessagesManager from "../dao/mongoManager/messagesManager.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("chat");
});

export default router;
