import { __dirname } from "../utils.js";
// import { ProductManager } from "../persistencia/dao/fileManager/productManager.js";
import ProductManager from "../persistencia/dao/mongoManager/productManager.js";
import { productModel}  from '../persistencia/dao/models/products.model.js'

export const productManager = new ProductManager(__dirname + "/product.json");


export async function getProductsAll(options){
    try{
        const products = await productManager.getAll(options)
        // console.log(products);
        return products
    }catch(error){
        console.log(error)
    }
}

export async function productCreate(obj){
    try{
        const newProduct = await productManager.createProduct(obj)
        return newProduct
    }catch(error){
        console.log(error);
    }
}

export async function productById(id){
    try{
        const productId = await productManager.getProductsByid(id)
        return productId
    }catch(error){
        console.log(error);
    }
}

export async function productDelete(id){
    try{
        const deleteProd = await productManager.deleteProduct(id)
        return deleteProd
    }catch(error){
        console.log(error);
    }
}

export async function productUpdate(id,obj){
    try{
        const updateProd = await productManager.updateProduct(id,obj)
        return updateProd
    }catch(error){
        console.log(error);
    }
}