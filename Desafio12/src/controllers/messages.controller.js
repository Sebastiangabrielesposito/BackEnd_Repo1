import {
  getMessagesAll,
  messageCreate,
  messageSearch,
  deleteMsj,
} from "../services/messages.service.js";

export async function messagesAll(req, res) {
  try {
    res.render("chat", {email: req.session.email});

    //Ejecutar para visualizar en thunderClient
    // const userMessage = await getMessagesAll();

    // if (!userMessage) {
    //   res.status(400).json({ message: "Error" });
    // } else {
    //   res.status(200).json({ message: "Sucess", userMessage });
    // }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function msjSearch(req, res) {
  try {
    const { messageId } = req.params;
    const searchMessage = await messageSearch(messageId);
    if (searchMessage) {
      res
        .status(200)
        .json({ message: "Message found successfully", searchMessage });
    } else {
      res.status(400).json({ message: "There is no message with that id" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function msjCreate(req, res) {
  try {
    const { user, message } = req.body;
    if (!user || !message) {
      res.json({ message: "Values required" });
    } else {
      const userAndMessage = await messageCreate({user, message});
      if (!userAndMessage) {
        res.status(400).json({ message: "Error" });
      } else {
        // res.json({ message: "Sucess", mensaje: userandMessage });
        res.render("chat");
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}


export async function msjRemoved(req,res){
    try{
        const { messageId } = req.params;
        const deleteMessage = await deleteMsj(messageId)
        if(!deleteMessage){
            res.status(400).json({message:'There is no message with that id'})
        }else{
            res.status(200).json({message:'message deleted', deleteMessage})
        }
    }catch(error){
        res.status(500).json({error})
    }
}