import { Router } from "express";
import fs from "fs";
import { __dirname } from "../utils.js";
// import CartsManager from "../persistencia/dao/fileManager/cartsManager.js";
// import CartsManager from "../persistencia/dao/mongoManager/cartsManager.js";
// import { productManager } from "./products.router.js";
import { resolveAny } from "dns";
import {CartAll,CarById,createCar,productsInCar,modifiedCar,QuantityUpdate,CarProductsDelete,prodFromCarDelete,carRemoved, createCarAdmin,createCarInUserRegister} from '../controllers/carts.controller.js';
import { isAdmin, isUser } from "../middlewares/authentLogin.js";
import {ticketCreated} from '../controllers/ticket.controller.js';



const router = Router();
// const cartsManager = new CartsManager(__dirname + "/cart.json");
// const pathJSON = __dirname + "/cart.json";


router.get("/", CartAll);

router.get("/:cid", CarById);

//crea un carro
router.post("/", createCar);

//Crea un carro cuando el usuario se registra
router.post("/CreateCarInUserRegister", createCarInUserRegister)

//Crea un carro en cualquier usuario siendo admin + userId
router.post("/admin/:userId",isAdmin, createCarAdmin);

router.post("/:cid/product/:pid",productsInCar);

router.put("/:cid", modifiedCar);

router.put("/:cid/product/:pid", QuantityUpdate);

//borra todos los productos del carrito
router.delete("/:cid", CarProductsDelete);

//borra un producto por id del carrito
router.delete("/:cid/product/:pid", prodFromCarDelete);

//borra todos los carros
router.delete("/delall/:cid", carRemoved);

//Ticket
router.post('/:cid/purchase',ticketCreated)

export default router;
