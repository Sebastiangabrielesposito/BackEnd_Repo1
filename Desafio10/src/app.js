import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import { productManager } from "./routes/products.router.js";
import messagesRouter from "./routes/messages.router.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";
import realTimeProducts from "./routes/realtimeproducts.router.js";
import camposRouter from "./routes/campos.router.js";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import "./persistencia/dbConfig.js";
import config from './config.js'

//passport
import passport from "passport";
import "./passport/passportStrategies.js";

//para guardar en Filestore
import FileStore from "session-file-store";
const fileStore = FileStore(session);

//para guardar en mongo
import mongoStore from "connect-mongo";

const app = express();

//Setting express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


//cookieParser
app.use(cookieParser());
// console.log(__dirname);

//Setting Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

let productos = [];
let mensajes = [];
// console.log(productos);
// console.log(mensajes);

//session fileStore
// app.use(
//   session({
//     store: new fileStore({
//       path: __dirname + "/session",
//     }),
//     resave: false,
//     saveUninitialized: false,
//     secret: "sessionKey",
//     cookie: { maxAge: 60000 },
//   })
// );

//session mongo
app.use(
  session({
    store: new mongoStore({
      mongoUrl:config.URL_MONGO
      // 'mongodb+srv://ecommerce-Coder:46583954@coderdatabase.bwdyham.mongodb.net/ecommerce?retryWrites=true&w=majority'
    }),
    resave: false,
    saveUninitialized: false,
    secret: "sessionKey",
    cookie: { maxAge: 60000 },
  })
);

// iniciar passport
app.use(passport.initialize());
// passport va a guardar la info en session
app.use(passport.session());

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/messages", messagesRouter);
app.use("/realtimeproducts", realTimeProducts);
app.use("/campos", camposRouter);
app.use("/users", usersRouter);
app.use("/views", viewsRouter);
app.get("/", (req, res) => {
  res.redirect("/views/login");
});

const PORT = config.PORT || 8080

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

  socket.on("enviar", (mensajes) => {
    productos.push(mensajes);
    socketServer.emit("respuesta", productos);
  });

  socket.on("eliminar", (idRemove) => {
    console.log("Eliminando el item:", idRemove);
    let newList = [...productos];
    let newListRemove = newList.filter((item) => item.id !== idRemove);
    productos = newListRemove;
    console.log(productos);
    socketServer.emit("respuesta", newListRemove);
  });
});
