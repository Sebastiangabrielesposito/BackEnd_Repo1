import express from 'express'
import productsRouter from '../routes/products.js'
import cartsRouter from '../routes/carts.js'
import { __dirName } from '../utils.js'; 
import { Server } from "socket.io";
import handlebars from 'express-handlebars'
import {product} from '../routes/products.js';
import viewsRouter from '../routes/views.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirName + '/public'))
// console.log(__dirName);


//routes
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)
app.use('/realtimeproducts',viewsRouter)


//Handlebars
app.engine('handlebars',handlebars.engine())
app.set('view engine','handlebars')
app.set('views',__dirName+'/views')

//Ruta
// app.get('/', async(req, res) => { 
//     res.render('index',{titulo: "index"})
//   })
const productos = []
const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`);
})

export const socketServer = new Server(httpServer)


  
socketServer.on('connection', (socket) => {
    console.log('usuario conectado ', socket.id)
    socket.on('disconnect', () =>{
        console.log('Usuario desconectado');
    })

    socket.on('enviar',(mensaje)=>{
        productos.push(mensaje)
        console.log(productos);
        // socketServer.emit('respuesta1', `code: ${mensaje.codigo} </br> title: ${mensaje.titulo} </br> description: ${mensaje.descripcion} </br>
        // price: $${mensaje.precio} </br> stock: ${mensaje.cantidad} </br>
        // category: ${mensaje.categoria} </br> status: ${mensaje.estado} `)
        socketServer.emit('respuesta1', productos)
    })
})
