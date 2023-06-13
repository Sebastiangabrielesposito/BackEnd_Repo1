// import { Server } from "socket.io";
// import logger from "./utils/winston/winston.js";
// import {httpServer} from "./app.js"
// // import { socketServer } from "./app";

// let productos = [];
// let mensajes = [];
// // logger.info(productos);
// // logger.info(mensajes);

// // export const startSocketServer = () => {
//   export const socketServer = new Server(httpServer);

//   socketServer.on("connection", (socket) => {
//     logger.info("usuario conectado ", socket.id);
//     socket.on("disconnect", () => {
//       logger.info("Usuario desconectado");
//     });
//     socket.emit("saludo", "Bienvenido a tu primer websocket");

//     socket.on("enviar", (mensaje) => {
//       logger.info(mensaje);
//     });

//     socket.on("mensaje1", (obj) => {
//       mensajes.push(obj);
//       logger.info(mensajes);
//       // socket.emit('respuesta1',`El usuario ${obj.nombre} escribio ${obj.mensaje}`)
//       socketServer.emit("respuesta1", mensajes);
//     });

//     socket.on("enviar", (mensajes) => {
//       productos.push(mensajes);
//       socketServer.emit("respuesta", productos);
//     });

//     socket.on("eliminar", (idRemove) => {
//       logger.info("Eliminando el item:", idRemove);
//       let newList = [...productos];
//       let newListRemove = newList.filter((item) => item.id !== idRemove);
//       productos = newListRemove;
//       // console.log(productos);
//       socketServer.emit("respuesta", newListRemove);
//     });
//   });
// // };
