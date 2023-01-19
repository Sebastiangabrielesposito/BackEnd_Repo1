import express from 'express';
import {ProductManager} from '../src/app.js';

// console.log({ProductManager});
const app = express();
const Product = new ProductManager('../product.json')


app.get('/',(req,res)=>{
    res.send(`<h1 style="color:lightblue; text-align:center; margin-top:100px">Bienvenidos</h1>`)
})

app.get('/productos', async(req,res)=>{
        const {limit} = req.query
        const productosLocalHost = await Product.getProducts(limit || "max")
        res.json({productosLocalHost})
    })

app.get('/productos/:id',async(req,res)=>{
    const {id} = req.params
    const productoLocalHostId = await Product.getProductsByid(id)
    res.json({productoLocalHostId})
})

const PORT = 8086

app.listen(PORT, ()=>{
    console.log(`Escuchando al ${PORT}`);
})
