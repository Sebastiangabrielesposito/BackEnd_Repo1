import { ProductManager } from "../src/app.js";

const product = new ProductManager('../product.json')


export const codeValidator = async (req, res, next) => {
    console.log("Ejecutando middleware code");
    const producto = req.body;
    const archivo = await product.getProducts();
    const evaluarCode = archivo.find((c) => c.code === producto.code);
    if (evaluarCode){
        res.send(`El codigo ${producto.code} ya existe en base de datos`);
    }
    else next();
};

export const productValidator = (req, res, next) => {
    console.log("Ejecutando middleware product");
    const producto = req.body;
    if (!producto.title || !producto.description || !producto.price || !producto.stock || !producto.category || !producto.status || !producto.thumbnail)res.send("Debes rellenar los campos correctamente");
    else next();
};

export const stock0Validator = (req, res, next) => {
    console.log("Ejecutando middleware stock");
    const producto = req.body;
    if (producto.stock <= 0) res.send("El stock no puede ser menor a 1");
    else next();
  };
