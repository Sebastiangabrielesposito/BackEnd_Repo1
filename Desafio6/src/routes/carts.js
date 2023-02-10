import { Router } from "express";
import fs from "fs";
// import CartsManager from "../dao/fileManager/cartsManager.js";
import CartsManager from "../dao/mongoManager/cartsManager.js";
import { productManager } from "./products.js";
import { __dirname } from "../utils.js";

const router = Router();
const cartsManager = new CartsManager(__dirname + "/cart.json");
const pathJSON = __dirname + "/cart.json";
console.log(pathJSON);

router.post("/", async (req, res) => {
  const products = [];
  const newCar = await cartsManager.createCar({ products });
  if (!newCar) {
    res.json({ message: "Error" });
  } else {
    res.json({ mesagge: `Carrito creado con exito`, newCar });
  }
  // const { product, quantity } = req.body;
  // if (!product || !quantity) {
  //   res.json({ message: "Values required" });
  // } else {
  //   const newCar = await cartsManager.createCar({ product, quantity });

  //   if (!newCar) {
  //     res.json({ message: "Error" });
  //   } else {
  //     res.json({ mesagge: `Carrito creado con exito`, newCar });
  //   }
  // }
});
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const car = await cartsManager.getCarByid(cid);
  if (car)
    res.status(200).json({ mesagge: `Carrito encontrado con exito`, car });
  else res.status(400).json({ mesagge: "Carrito no existe con ese id" });
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cars = await cartsManager.getAll();
    const car = await cartsManager.getCarByid(cid);
    if (car) {
      const productos = car.products;
      const prod = await productManager.getProductsByid(pid);
      if (prod) {
        const prodDuplicado = productos.findIndex(
          (p) => p.producto === parseInt(prod.id)
        );
        console.log(prodDuplicado);
        if (prodDuplicado === -1) {
          productos.push({ producto: prod.id, quantity: 1 });
          const updatecar = car.id - 1;
          cars.splice(updatecar, 1, car);
          await fs.promises.writeFile(pathJSON, JSON.stringify(cars));
          res.status(200).json({ mesagge: "Producto agregado con exito" });
        } else {
          productos[prodDuplicado].quantity++;
          const updatecar = car.id - 1;
          cars.splice(updatecar, 1, car);
          await fs.promises.writeFile(pathJSON, JSON.stringify(cars));
          res
            .status(200)
            .json({ mesagge: "Producto[cantidad+1] agregado con exito" });
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
