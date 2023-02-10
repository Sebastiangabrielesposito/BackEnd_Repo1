import express from "express";
import productsRouter from "../routes/products.js";
import cartsRouter from "../routes/carts.js";
import { __dirname } from "../utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
console.log(__dirname);

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});
