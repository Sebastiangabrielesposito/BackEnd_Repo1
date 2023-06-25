import { json, Router } from "express";
import { upload } from "../middlewares/multer.js";
import {
  codeValidator,
  productValidator,
  stock0Validator,
} from "../middlewares/productValidator.js";
import { socketServer } from "../app.js";
// import {socketServer} from '../socket.js';
import {
  ProdAll,
  CreateProd,
} from "../controllers/realTimeProducts.controller.js";
// import { ProductManager } from "../persistencia/dao/fileManager/productManager.js";
// import { productManager } from "./products.router.js";
import { isAdmin } from "../middlewares/authentLogin.js";

const router = Router();

router.get("/", isAdmin,ProdAll);

router.post(
  "/",
  upload.single("file"),
  codeValidator,
  productValidator,
  stock0Validator,
  CreateProd
);

export default router;
