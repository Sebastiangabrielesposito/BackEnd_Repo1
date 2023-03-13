import mongoose from "mongoose";

const URL_MONGO =
  "mongodb+srv://ecommerce-Coder:46583954@coderdatabase.bwdyham.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose.connect(URL_MONGO, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Conectado a la base de datos");
  }
});
