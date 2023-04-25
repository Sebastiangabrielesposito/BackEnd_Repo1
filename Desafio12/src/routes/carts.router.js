import { Router } from "express";
import fs from "fs";
import { __dirname } from "../utils.js";
// import CartsManager from "../persistencia/dao/fileManager/cartsManager.js";
// import CartsManager from "../persistencia/dao/mongoManager/cartsManager.js";
// import { productManager } from "./products.router.js";
import { resolveAny } from "dns";
import {CartAll,CarById,createCar,productsInCar,modifiedCar,QuantityUpdate,CarProductsDelete,prodFromCarDelete,carRemoved} from '../controllers/carts.controller.js';
import { isUser } from "../middlewares/authentLogin.js";
import {ticketCreated} from '../controllers/ticket.controller.js';



const router = Router();
// const cartsManager = new CartsManager(__dirname + "/cart.json");
// const pathJSON = __dirname + "/cart.json";


router.get("/", CartAll);

router.get("/:cid", CarById);

router.post("/", createCar);

router.post("/:cid/product/:pid",productsInCar);

router.put("/:cid", modifiedCar);

router.put("/:cid/product/:pid", QuantityUpdate);

router.delete("/:cid", CarProductsDelete);

router.delete("/:cid/product/:pid", prodFromCarDelete);

router.delete("/delall/:cid", carRemoved);

//Ticket
router.post('/:cid/purchase',ticketCreated)

export default router;
