import {
  getProductsAll,
  productCreate,
  productById,
  productDelete,
  productUpdate,
} from "../services/product.service.js";
import { json } from "express";
import { productModel } from "../persistencia/DAOs/mongoDB/models/products.model.js";

export async function productsAll(req, res) {
  try {
    const { limit = 12, page = 1, category, sort } = req.query;
    const options = { limit, page, category };
    console.log(req.session.email);
    if (sort) {
      options.sort = sort;
    }
    const products = await getProductsAll(options);
    if (!limit || !page || !category) {
      // console.log(products);
      // res.json({ products });
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
    res.status(500).json({ error });
  }
}

export async function productId(req, res) {
  try {
    const { pid } = req.params;
    const product = await productById(pid);
    if (product) {
      res.render("productHome", { product, titulo: "ProductHome" });
      // res.status(200).json({ message: `Producto encontrado con exito`, product });
    } else {
        res.status(400).json({ message: "Product does not exist with that id" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function prodCreate(req,res){
    try{
        const obj = req.body;
        const prod = await productCreate(obj)
        if(prod){
            //Ejecutar con fileSystem re dirije a todos los productos en localHost
            res.redirect("/api/products");

            //Ejecutar con mongo - para visualizar con thunderClient
            // res.json({ mesagge: `Producto creado con exito`, prod });
        } else{
            res.status(400).json({message:'Error creating the product'})
        }
    }catch(error){
        res.status(500).json({error})
    }
}

export async function prodUpdate(req,res){
    try{
        const { pid } = req.params;
        const obj = req.body;
        const product = await productUpdate(pid,obj)
        if(product){
            res.status(200).json({message:'Product successfully modified', product})
        }else{
            res.status(400).json({message:'Error when modifying the product'})
        }
    }catch(error){
        res.status(500).json({error})
    }
}

export async function prodDelete(req,res){
    try{
        const { pid } = req.params;
        const product = await productDelete(pid)
        if(product){
            res.status(200).json({message:'Product removed successfully',product})
        }else{
            res.status(400).json({message:'There is no product with that id'})
        }
    }catch(error){
        res.status(500).json({error})
    }
}