import { __dirname } from "../utils.js";
// import { ProductManager } from "../persistencia/dao/fileManager/productManager.js";
// import ProductManager from "../persistencia/DAOs/mongoDB/mongoManager/productManager.js";
import { productModel}  from '../persistencia/DAOs/mongoDB/models/products.model.js'
// import {productManager} from '../persistencia/DAOs/factory.js';
import { productManager } from '../persistencia/DAOs/factory.js';
import logger from '../utils/winston/winston.js';
import CustomError from '../utils/errors/CustomError.js';
import {ProductErrorNames, ProductErrorMessages, ProductErrorCauses} from '../utils/errors/errors.enum.js';


// export const productManager = new ProductManager(__dirname + "/product.json");


export async function getProductsAll(options){
    try{
        const products = await productManager.getAll(options)
        // console.log(products);
        return products
    }catch(error){
        CustomError.createCustomError({
            name: ProductErrorNames.GET_PRODUCT_ERROR,
            message: ProductErrorMessages.GET_PRODUCT_ERROR,
            cause: ProductErrorCauses.GET_PRODUCT_ERROR,
          })  
    }
}

export async function productCreate(obj){
    try{
        const newProduct = await productManager.createProduct(obj)
        return newProduct
    }catch(error){
        CustomError.createCustomError({
            name: ProductErrorNames.GET_PRODUCT_ERROR,
            message: ProductErrorMessages.GET_PRODUCT_ERROR,
            cause: ProductErrorCauses.GET_PRODUCT_ERROR,
          })  
    }
}

export async function productById(id){
    try{
        const productId = await productManager.getProductsByid(id)
        return productId
    }catch(error){
        CustomError.createCustomError({
            name: ProductErrorNames.GET_PRODUCT_ERROR,
            message: ProductErrorMessages.GET_PRODUCT_ERROR,
            cause: ProductErrorCauses.GET_PRODUCT_ERROR,
          })  
    }
}

export async function productDelete(id){
    try{
        const deleteProd = await productManager.deleteProduct(id)
        return deleteProd
    }catch(error){
        CustomError.createCustomError({
            name: ProductErrorNames.DELETE_PRODUCT_ERROR,
            message: ProductErrorMessages.DELETE_PRODUCT_ERROR,
            cause: ProductErrorCauses.DELETE_PRODUCT_ERROR,
          })  
    }
}

export async function productUpdate(id,obj){
    try{
        const updateProd = await productManager.updateProduct(id,obj)
        return updateProd
    }catch(error){
        CustomError.createCustomError({
            name: ProductErrorNames.UPDATE_PRODUCT_ERROR,
            message: ProductErrorMessages.UPDATE_PRODUCT_ERROR,
            cause: ProductErrorCauses.UPDATE_PRODUCT_ERROR,
          })  
    }
}