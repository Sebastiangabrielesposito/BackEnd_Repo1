import { json, Router } from "express";
import { upload } from "../middlewares/multer.js";
import {
  codeValidator,
  productValidator,
  stock0Validator,
} from "../middlewares/productValidator.js";
import { socketServer } from "../app.js";
import {
  ProdAll,
  CreateProd,
} from "../controllers/realTimeProducts.controller.js";
// import { ProductManager } from "../persistencia/dao/fileManager/productManager.js";
// import { productManager } from "./products.router.js";

const router = Router();

router.get("/", ProdAll);

router.post(
  "/",
  upload.single("file"),
  codeValidator,
  productValidator,
  stock0Validator,
  CreateProd
);

export default router;
