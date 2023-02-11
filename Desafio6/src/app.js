import express from "express";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import { productManager } from "./routes/products.js";
import messagesRouter from "./routes/messages.js";
// import viewsRouter from "./routes/views.router.js";
import "./dbConfig.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
// console.log(__dirname);

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/messages", messagesRouter);
// app.use("/realtimeproducts", viewsRouter);

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

let mensajes = [];
console.log(mensajes);
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});

export const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("usuario conectado ", socket.id);
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
  socket.emit("saludo", "Bienvenido a tu primer websocket");

  socket.on("enviar", (mensaje) => {
    console.log(mensaje);
  });

  socket.on("mensaje1", (obj) => {
    mensajes.push(obj);
    console.log(mensajes);
    // socket.emit('respuesta1',`El usuario ${obj.nombre} escribio ${obj.mensaje}`)
    socketServer.emit("respuesta1", mensajes);
  });
});
//   socket.on("enviar", (mensajes) => {
//     productos.push(mensajes);
//     socketServer.emit("respuesta", productos);
//   });

//   socket.on("eliminar", (idRemove) => {
//     console.log("Eliminando el item:", idRemove);
//     let newList = [...productos];
//     // console.log(newList.length);
//     let newListRemove = newList.filter((item) => item.id !== idRemove);
//     // console.log(newListRemove.length);
//     // console.log(newListRemove);
//     // console.log(productos);
//     productos = newListRemove;
//     console.log(productos);
//     socketServer.emit("respuesta", newListRemove);
//   });
// });

// console.log(generateUUID());
