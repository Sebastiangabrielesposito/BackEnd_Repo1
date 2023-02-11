import { json, Router } from "express";
import { ProductManager } from "../dao/fileManager/productManager.js";
import { productManager } from "./products.js";
import { upload } from "../middlewares/multer.js";
import {
  codeValidator,
  productValidator,
  stock0Validator,
} from "../middlewares/productValidator.js";
import { socketServer } from "../app.js";

const router = Router();

router.get("/", async (req, res) => {
  const prod = await productManager.getAll();
  res.render("realtimeproducts", { prod, titulo: "realTimeProducts" });
  // res.send('prueba')
});

router.post(
  "/",
  upload.single("file"),
  codeValidator,
  productValidator,
  stock0Validator,
  async (req, res) => {
    try {
      const obj = req.body;
      const producto = await productManager.createProduct(obj);

      res.render("realtimeproducts", { producto });
      console.log({ mesagge: `Producto creado con exito`, producto });
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
