import { Router } from "express";
import { ProductManager } from "../src/app.js";
import { product } from "./products.js";
import fs from 'fs'

const router = Router()
const carts = new ProductManager('../car.json')
const pathJSON = '../car.json'

router.post('/',async(req,res)=>{
    const product = []
    const car = await carts.addProducts({product})
    res.json({mesagge:`Carrito creado con exito`, car})
})
 
router.get('/:cid', async(req,res)=>{
    const {cid} = req.params
    const car = await carts.getProductsByid(cid)
    if(car) res.status(200).json({mesagge:`Carrito encontrado con exito`, car})
    else res.status(400).json({mesagge:'Carrito no existe con ese id'})
})

router.post('/:cid/product/:pid', async(req,res)=>{
    try{
        const {cid, pid} =req.params
        const cars = await carts.getProducts()
        const car = await carts.getProductsByid(parseInt(cid))
        if(car){
            const products = car.product 
            const prod = await product.getProductsByid(parseInt(pid))
            if(prod){
                const prodDuplicado = products.findIndex((p)=> p.producto === parseInt(prod.id))
                console.log(prodDuplicado);
                if(prodDuplicado === -1){
                    products.push( {producto: prod.id, quantity:1})   
                    const updatecar = car.id-1
                    cars.splice(updatecar,1,car)
                    await fs.promises.writeFile(pathJSON,JSON.stringify(cars))
                    res.status(200).json({mesagge:'Producto agregado con exito'})
                }else {
                    products[prodDuplicado].quantity++
                    const updatecar = car.id-1
                    cars.splice(updatecar,1,car)
                    await fs.promises.writeFile(pathJSON,JSON.stringify(cars))
                    res.status(200).json({mesagge:'Producto[cantidad+1] agregado con exito'})
                }
            }else res.status(400).json({mesagge:'No existe producto con ese id'})
        }else res.status(400).json({mesagge:'No existe carrito con ese id'})
    }catch (error){
        return error
    }
})

router.delete('/:cid', async (req,res)=>{
    try{
        const {cid} = req.params
        const cars = await carts.deleteProduct(parseInt(cid))
        if(cars) res.status(200).json({mesagge:'carrito eliminado con exito'})
        else res.status(400).json({mesagge: 'No existe carrito con ese id'})
    }catch (error){
        console.log(error);
    }
})

export default router