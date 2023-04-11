import mongoose from "mongoose";
import config from '../config.js'

const URL_MONGO = config.URL_MONGO
// 'mongodb+srv://ecommerce-Coder:46583954@coderdatabase.bwdyham.mongodb.net/ecommerce?retryWrites=true&w=majority'
 
// mongoose.set("strictQuery", true);
// mongoose.connect(URL_MONGO, (error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Conectado a la base de datos");
//   }
// });

//nueva version de mongoose
mongoose.set("strictQuery", true);
try{
  await mongoose.connect(URL_MONGO)
  console.log('Conectado a la base de datos');
}catch (error){
  console.log(error);
}