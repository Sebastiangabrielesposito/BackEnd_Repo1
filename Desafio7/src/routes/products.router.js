import { json, Router } from "express";
import { __dirname } from "../utils.js";
// import { ProductManager } from "../dao/fileManager/productManager.js";
import ProductManager from "../dao/mongoManager/productManager.js";
import { upload } from "../middlewares/multer.js";
import {
  codeValidator,
  productValidator,
  stock0Validator,
} from "../middlewares/productValidator.js";
import { productModel } from "../dao/models/products.model.js";

const router = Router();

export const productManager = new ProductManager(__dirname + "/product.json");

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, category } = req.query;
    const prod = await productManager.getAll(limit || "max");
    const productInfo = await productModel.paginate(
      { category },
      { limit, page, sort: { price: 1 } }
    );
    if (!limit || !page || !category) {
      //Ejecutar con mongo - visualizacion en thunderClient
      // res.json(prod);
      //Ejecutar con fileSystem - front de productos
      res.render("home", { prod, titulo: "Productos" });
    } else {
      if (productInfo.hasPrevPage === false) {
        if (productInfo.hasNextPage === false) {
          res.json({
            status: "exitoso",
            payload: productInfo.docs,
            totalPages: productInfo.totalPages,
            prevPage: productInfo.prevPage,
            nextPage: productInfo.nextPage,
            page: productInfo.page,
            hasPrevPage: productInfo.hasPrevPage,
            hasNextPage: productInfo.hasNextPage,
            prevLink: null,
            nextLink: null,
          });
        } else {
          res.json({
            status: "exitoso",
            payload: productInfo.docs,
            totalPages: productInfo.totalPages,
            prevPages: productInfo.prevPage,
            nextPage: productInfo.nextPage,
            page: productInfo.page,
            hasPrevPage: productInfo.hasPrevPage,
            hasNextPage: productInfo.hasNextPage,
            prevLink: null,
            nextLink: `localhost:8080/api/products/?page=${productInfo.nextPage}`,
          });
        }
      } else {
        if (productInfo.hasNextPage === false) {
          res.json({
            status: "exitoso",
            payload: productInfo.docs,
            totalPages: productInfo.totalPages,
            prevPage: productInfo.prevPage,
            nextPage: productInfo.nextPage,
            page: productInfo.page,
            hasPrevPage: productInfo.hasPrevPage,
            hasNextPage: productInfo.hasNextPage,
            prevLink: `localhost:8080/api/products/?page=${productInfo.prevPage}`,
            nextLink: null,
          });
        } else {
          res.json({
            status: "exitoso",
            payload: productInfo.docs,
            totalPages: productInfo.totalPages,
            prevPage: productInfo.prevPage,
            nextPage: productInfo.nextPage,
            page: productInfo.page,
            hasPrevPage: productInfo.hasPrevPage,
            hasNextPage: productInfo.hasNextPage,
            prevLink: `localhost:8080/api/products/?page=${productInfo.prevPage}`,
            nextLink: `localhost:8080/api/products/?page=${productInfo.nextPage}`,
          });
        }
      }
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
      //res.redirect("/api/products");

      //Ejecutar con mongo - para visualizar con thunderClient
      res.json({ mesagge: `Producto creado con exito`, producto });
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
