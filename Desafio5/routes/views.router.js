import { json, Router } from "express";
import { ProductManager } from "../src/app.js";
import {product} from './products.js';
import {upload} from '../middlewares/multer.js';
import {codeValidator, productValidator, stock0Validator} from '../middlewares/productValidator.js';
import { socketServer } from "../src/server.js";

const router = Router()

router.get('/', async(req,res)=>{
    const prod = await product.getProducts()
    res.render('realtimeproducts',{prod,titulo: "realTimeProducts"})
    // res.send('prueba')
})



router.post('/', upload.single('file'), codeValidator , productValidator, stock0Validator ,async(req,res)=>{
    try{
        const obj = req.body
        const producto = await product.addProducts(obj)
        
        res.render('realtimeproducts',{producto})
        console.log({mesagge:`Producto creado con exito`, producto})
    }catch (error){
        console.log(error);
    }
})

// router.delete('/:pid', async (req,res)=>{
//     try{
//         const {pid} = req.params
//         const prod = await product.deleteProduct(parseInt(pid))
//         if(prod) res.status(200).json({mesagge:'Producto eliminado con exito'})
//         else res.status(400).json({mesagge: 'No existe usuario con ese id'})
//     }catch (error){
//         console.log(error);
//     }
// })
export default router