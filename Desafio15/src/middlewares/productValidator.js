// import { ProductManager } from "../dao/fileManager/productManager.js";
import ProductManager from "../persistencia/DAOs/mongoDB/mongoManager/productManager.js";
import logger from '../utils/winston/winston.js';

const productManager = new ProductManager("../product.json");

export const codeValidator = async (req, res, next) => {
  logger.info("Ejecutando middleware code");
  const producto = req.body;
  const archivo = await productManager.getAll();
  const evaluarCode = archivo.find((c) => c.code === producto.code);
  if (evaluarCode) {
    res.send(`El codigo ${producto.code} ya existe en base de datos`);
  } else next();
};

export const productValidator = (req, res, next) => {
  logger.info("Ejecutando middleware product");
  const producto = req.body;
  let prodValidator =
    !producto.code ||
    !producto.title ||
    !producto.description ||
    !producto.price ||
    !producto.stock ||
    !producto.category ||
    !producto.status ||
    producto.status === "false";
  logger.info(producto.status);
  // if (prodValidator) res.send("Debes rellenar los campos correctamente");
  // else next();

  if (prodValidator) {
    res.redirect("/campos");
  } else {
    next();
  }
};

export const stock0Validator = (req, res, next) => {
  logger.info("Ejecutando middleware stock");
  const producto = req.body;
  if (producto.stock <= 0) res.send("El stock no puede ser menor a 1");
  else next();
};
