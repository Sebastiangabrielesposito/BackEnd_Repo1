import { Router } from "express";
import fs from "fs";
import { __dirname } from "../utils.js";
// import CartsManager from "../dao/fileManager/cartsManager.js";
import CartsManager from "../dao/mongoManager/cartsManager.js";
import { productManager } from "./products.router.js";
import { resolveAny } from "dns";

const router = Router();
const cartsManager = new CartsManager(__dirname + "/cart.json");
const pathJSON = __dirname + "/cart.json";
// console.log(pathJSON);

router.get("/", async (req, res) => {
  const carts = await cartsManager.getAll();
  res.json({ carts });
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const car = await await cartsManager.getCarByid(cid);
  if (car)
    res.status(200).json({ mesagge: `Carrito encontrado con exito`, car });
  else res.status(400).json({ mesagge: "Carrito no existe con ese id" });
});

router.post("/", async (req, res) => {
  try {
    const products = [];
    const newCart = await cartsManager.createCar({ products });
    if (!newCart) {
      res.json({ message: "Error" });
    } else {
      res.json({ mesagge: `Carrito creado con exito`, newCart });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cars = await cartsManager.getAll();
    const car = await cartsManager.getCarByid(cid);
    if (car) {
      // const productos = car.products;
      const prod = await productManager.getProductsByid(pid);
      if (prod) {
        const prodDuplicado = car.products.findIndex(
          (p) => p.producto.toString() === prod.id.toString()
        );
        if (prodDuplicado === -1) {
          car.products.push({ producto: prod.id, quantity: 1 });
        } else {
          car.products[prodDuplicado].quantity++;
        }
        const updatecar = car.id - 1;
        cars.splice(updatecar, 1, car);

        try {
          // await fs.promises.writeFile(pathJSON, JSON.stringify(cars));
          await car.save();
          res.status(200).json({ message: "Producto agregado con éxito" });
        } catch (err) {
          res.status(500).json({ message: "Error al agregar el producto" });
        }
      } else res.status(400).json({ mesagge: "No existe producto con ese id" });
    } else res.status(400).json({ mesagge: "No existe carrito con ese id" });
  } catch (error) {
    return error;
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cars = await cartsManager.deleteCar(cid);
    if (cars)
      res.status(200).json({ mesagge: "carrito eliminado con exito", cars });
    else res.status(400).json({ mesagge: "No existe carrito con ese id" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
