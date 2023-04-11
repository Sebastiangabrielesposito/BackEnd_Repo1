import {
    getProductsAll,
    productCreate,
    productById,
    productDelete,
    productUpdate,
  } from "../services/product.service.js";
import { json } from "express";
import { productModel } from "../persistencia/dao/models/products.model.js";



export async function ProdAll(req, res) {
    try{
        const prod = await getProductsAll()
        res.render("realtimeproducts", { prod, titulo: "realTimeProducts" });
    }catch(error){
        res.status(500).json({error})
    }
}

export async function CreateProd(req,res){
    try{
        const obj = req.body;
        const producto = await productCreate(obj)
        if(producto){
            res.render("realtimeproducts", { producto }); 
        }else{
            res.status(400).json({message:'Error creating the product'})
        }
    }catch(error){
        res.status(500).json({error})
    }
}