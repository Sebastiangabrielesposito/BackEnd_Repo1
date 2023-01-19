import express from 'express'
import productsRouter from '../routes/products.js'
import cartsRouter from '../routes/carts.js'
import { __dirName  } from '../utils.js'



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirName + '/public'))
console.log(__dirName);


//routes
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)



const PORT = 8080

app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`);
})