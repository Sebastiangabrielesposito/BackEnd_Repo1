import { ProductManager } from "../src/app.js";

const product = new ProductManager('../product.json')

export const codeValidator = async (req, res, next) => {
    console.log("Ejecutando middleware");
    const producto = req.body;
    const archivo = await product.getProducts();
    const evaluarCode = archivo.find((c) => c.code === producto.code);
    if (evaluarCode){
        res.send(`El codigo ${producto.code} ya existe en base de datos`);
    }
    else next();
};

export const titleValidator = (req, res, next) => {
    console.log("Ejecutando middleware");
    const producto = req.body;
    if (!producto.title)res.send("Debes rellenar los campos correctamente");
    else next();
};

export const descriptionValidator = (req, res, next) => {
    console.log("Ejecutando middleware");
    const producto = req.body;
    if (!producto.description)res.send("Debes rellenar los campos correctamente");
    else next();
};

export const priceValidator = (req, res, next) => {
    console.log("Ejecutando middleware");
    const producto = req.body;
    if (!producto.price)res.send("Debes rellenar los campos correctamente");
    else next();
};

export const stockValidator = (req, res, next) => {
    console.log("Ejecutando middleware");
    const producto = req.body;
    if (!producto.stock) res.send("El stock no puede ser nulo");
    else next();
};

export const stock0Validator = (req, res, next) => {
    console.log("Ejecutando middleware");
    const producto = req.body;
    if (producto.stock <= 0) res.send("El stock no puede ser menor a 1");
    else next();
  };

export const categoryValidator = (req, res, next) => {
    console.log("Ejecutando middleware");
    const producto = req.body;
    if (!producto.category)res.send("Debes rellenar los campos correctamente");
    else next();
};

export const statusValidator = (req, res, next) => {
    console.log("Ejecutando middleware");
    const producto = req.body;
    if (!producto.status)res.send("Debes rellenar los campos correctamente");
    else next();
};

export const thumbnailValidator = (req, res, next) => {
    console.log("Ejecutando middleware");
    const producto = req.body;
    if (!producto.thumbnail)
      res.send("Debes rellenar los campos correctamente");
    else next();
};
      

