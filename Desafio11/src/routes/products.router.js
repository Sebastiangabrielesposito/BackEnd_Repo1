import { json, Router } from "express";
// import { __dirname } from "../utils.js";
// import { ProductManager } from "../persistencia/dao/fileManager/productManager.js";
// import ProductManager from "../persistencia/dao/mongoManager/productManager.js";
// import { productModel } from "../persistencia/dao/models/products.model.js";

// export const productManager = new ProductManager(__dirname + "/product.json");


import { upload } from "../middlewares/multer.js";
import {
  codeValidator,
  productValidator,
  stock0Validator,
} from "../middlewares/productValidator.js";
import { auth } from "../middlewares/authentLogin.js";
import {
  productsAll,
  productId,
  prodCreate,
  prodUpdate,
  prodDelete,
} from "../controllers/product.controller.js";
import {__dirname} from '../utils.js';
import ProductManager from '../persistencia/dao/mongoManager/productManager.js';

const router = Router();

router.get("/", auth, productsAll);

router.get("/:pid", productId);

router.post(
  "/",
  upload.single("file"),
  codeValidator,
  productValidator,
  stock0Validator,
  prodCreate
);

router.put("/:pid", prodUpdate);

router.delete("/:pid", prodDelete);

export default router;
