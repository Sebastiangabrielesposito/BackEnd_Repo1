import { Router } from "express";
import { ProductManager } from "../src/app.js";
import { upload } from "../middlewares/multer.js";
import	{codeValidator, stockValidator,titleValidator,descriptionValidator,categoryValidator,priceValidator,statusValidator,stock0Validator,thumbnailValidator} from '../middlewares/productValidator.js'


const router = Router()

 export const product = new ProductManager('../product.json')


router.get('/', async(req,res)=>{
    try{
        const {limit} = req.query
        const prod = await product.getProducts(limit || "max")
        res.json({prod})
    }catch (error){
        console.log(error);
    }
})

router.get('/:pid', async(req,res)=>{
    try{
        const {pid} = req.params
        const prod = await product.getProductsByid(pid)
        if(prod) res.status(200).json({mesagge:`Usuario encontrado con exito`, prod})
        else res.status(400).json({mesagge:'Usuario no existe con ese id'})
    }catch (error){
        console.log(error);
    }
})

router.post('/', upload.single('file'), codeValidator , titleValidator, descriptionValidator, priceValidator,stockValidator,stock0Validator,categoryValidator,statusValidator,thumbnailValidator, async(req,res)=>{
    try{
        const obj = req.body
        const producto = await product.addProducts(obj)
        res.json({mesagge:`Producto creado con exito`, producto})
    }catch (error){
        console.log(error);
    }
})

router.put('/:pid', async(req,res)=>{
    try{
        const {pid} = req.params
        const obj = req.body
        const prod = await product.updateProduct(parseInt(pid),obj)
        res.json({mesagge:'Producto modificado con exito', prod})
    }catch (error){
        console.log(error);
    }
})

router.delete('/:pid', async (req,res)=>{
    try{
        const {pid} = req.params
        const prod = await product.deleteProduct(parseInt(pid))
        if(prod) res.status(200).json({mesagge:'Usuario eliminado con exito'})
        else res.status(400).json({mesagge: 'No existe usuario con ese id'})
    }catch (error){
        console.log(error);
    }
})


export default router