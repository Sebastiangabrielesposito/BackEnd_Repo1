import { Router } from "express";
import { __dirname } from "../utils.js";
import { socketServer } from "../app.js";
import MessagesManager from "../persistencia/dao/mongoManager/messagesManager.js";
const router = Router();

const messagesManager = new MessagesManager();

router.get("/", async (req, res) => {
  res.render("chat", {email: req.session.email});

  //Ejecutar para visualizar en thunderClient
  // const userMessage = await messagesManager.getAll();
  // if (!userMessage) {
  //   res.json({ message: "Error" });
  // } else {
  //   res.json({ message: "Sucess", userMessage });
  // }
});

router.get("/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    const searchMsj = await messagesManager.searchMessage(messageId);
    if (searchMsj) {
      res.json({ message: "Mensaje encontrado con exito", searchMsj });
    } else {
      res.json({ message: "No existe mensaje con ese id" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { user, message } = req.body;

    if (!user || !message) {
      res.json({ message: "Values required" });
    } else {
      const userandMessage = await messagesManager.createMessage({
        user,
        message,
      });
      if (!userandMessage) {
        res.json({ message: "Error" });
      } else {
        // res.json({ message: "Sucess", mensaje: userandMessage });
        res.render("chat");
      }
    }
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    const deleteMsj = await messagesManager.deleteMessage(messageId);
    if (!deleteMsj) {
      res.json({ message: "No existe mensaje con ese id" });
    } else {
      res.json({ message: "Mensaje eliminado", deleteMsj });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
