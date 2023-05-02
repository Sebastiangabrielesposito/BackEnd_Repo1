import { __dirname } from "../utils.js";
// // import CartsManager from "../persistencia/dao/fileManager/cartsManager.js";
// import CartsManager from "../persistencia/DAOs/mongoDB/mongoManager/cartsManager.js";
// // import { productManager } from "./products.router.js";
// // import { productManager } from './product.service.js'

import {cartsManager} from '../persistencia/DAOs/factory.js '

// const cartsManager = new CartsManager(__dirname + "/cart.json");
const pathJSON = __dirname + "/cart.json";

export async function getCartAll(){
    try{
        const cars = cartsManager.getAll()
        return cars
    }catch(error){
        console.log(error);
    }
}

export async function getCarId(id){
    try{
        const carById = await cartsManager.getCarByid(id)
        return carById
    }catch(error){
        console.log(error);
    }
}

export async function createOneCar(obj){
    try{
        const newCar = await cartsManager.createCar(obj)
        return newCar
    }catch(error){
        console.log(error);
    }
}


export async function carUpdate(cartId,products){
    try{
        const updateCar = await cartsManager.updateCartProducts(cartId,products)
        return updateCar
    }catch(error){
        console.log(error);
    }
}

export async function productQuantityUpdate(cartId,productId,newQuantity){
    try{
        const updateProdQuantity = await cartsManager.updateProductQuantity(cartId,productId,newQuantity)
        return updateProdQuantity
    }catch(error){
        console.log(error);
    }
}

export async function carDelete(id){
    try{
        const deleteCar = await cartsManager.deleteCar(id)
        return deleteCar
    }catch(error){
        console.log(error);
    }
}

export async function prodCarDelete(id){
    try{
        const deleteProdsCar = await cartsManager.deleteProductsCar(id)
        return deleteProdsCar
    }catch(error){
        console.log(error);
    }
}

export async function productFromCarDelete(cartId,productId){
    try{
        const deleteProductFromCar = await cartsManager.deleteProductFromCart(cartId,productId)
        return deleteProductFromCar
    }catch(error){
        console.log(error);
    }
}

export async function deleteCarProducts(id){
    try{
        const carProductsDelete = await cartsManager.carProductsDelete(id)
        return carProductsDelete
    }catch(error){
        console.log(error);
    }
}