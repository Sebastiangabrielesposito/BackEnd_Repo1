import { json, Router } from "express";
import { __dirname } from "../utils.js";
import { ProductManager } from "../persistencia/dao/fileManager/productManager.js";
// import ProductManager from "../persistencia/dao/mongoManager/productManager.js";
import { upload } from "../middlewares/multer.js";
import {
  codeValidator,
  productValidator,
  stock0Validator,
} from "../middlewares/productValidator.js";
import { productModel } from "../persistencia/dao/models/products.model.js";
import { auth } from "../middlewares/authentLogin.js";

const router = Router();

export const productManager = new ProductManager(__dirname + "/product.json");

router.get("/", auth, async (req, res) => {
  try {
    const { limit = 10, page = 1, category, sort } = req.query;
    const options = { limit, page, category };
    if (sort) {
      options.sort = sort;
    }
    const products = await productManager.getAll(options);
    if (!limit || !page || !category) {
      res.render("home", {
        prod: products,
        titulo: "Productos",
        email: req.session.email,
      });
    } else {
      const count = await productModel.countDocuments({ category });
      const totalPages = Math.ceil(count / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      const prevPage = hasPrevPage ? page - 1 : null;
      const nextPage = hasNextPage ? page + 1 : null;
      const prevLink = hasPrevPage
        ? `localhost:8080/api/products/?page=${prevPage}`
        : null;
      const nextLink = hasNextPage
        ? `localhost:8080/api/products/?page=${nextPage}`
        : null;

      res.json({
        status: "exitoso",
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductsByid(pid);
    if (product)
      res
        .status(200)
        .json({ mesagge: `Producto encontrado con exito`, product });
    else res.status(400).json({ mesagge: "Producto no existe con ese id" });
  } catch (error) {
    console.log(error);
  }
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
      //Ejecutar con fileSystem re dirije a todos los productos en localHost
      res.redirect("/api/products");

      //Ejecutar con mongo - para visualizar con thunderClient
      // res.json({ mesagge: `Producto creado con exito`, producto });
    } catch (error) {
      console.log(error);
    }
  }
);

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const obj = req.body;
    const product = await productManager.updateProduct(pid, obj);
    res.json({ mesagge: "Producto modificado con exito", product });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.deleteProduct(pid);
    if (product)
      res
        .status(200)
        .json({ mesagge: "Producto eliminado con exito", product });
    else res.status(400).json({ mesagge: "No existe usuario con ese id" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
