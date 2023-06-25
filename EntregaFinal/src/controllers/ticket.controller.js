import {createTicket,getTicketById,updateTicketById,deleteTicketById} from '../services/ticket.service.js';
import {
    getCartAll,
    createOneCar,
    getCarId,
    carUpdate,
    productQuantityUpdate,
    carDelete,
    prodCarDelete,
    productFromCarDelete,
    deleteCarProducts,
  } from "../services/carts.service.js";
import { productById,productUpdate } from "../services/product.service.js";
import {productId} from '../controllers/product.controller.js'
import { ticketModel } from '../persistencia/DAOs/mongoDB/models/ticket.model.js';
import { CarProductsDeleteShop } from './carts.controller.js';
// import {RespuestaCookiesUser} from './users.controller.js';

  //se utilizo la libreria npm install uuid para autogenerar el code: en el ticket.

  //funcion de uuid para usar el prefijo que se quiera al generar el ticket por ejemplo "TCKT"

  const generateUniqueCode = (prefix = "") => {
    const randomPart = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    return `${prefix}${randomPart}`;
  };

export async function ticketCreated(req,res) {
    try{
        const cid = req.user.cart[0].toString();
        // const { cid } = req.params;
        const cart = await getCarId(cid)

        if(!cart){
            return res.status(404).json({ message: 'Cart not found' });
        }
        if(cart.products.length === 0){
            return res.status(400).json({message:"El carrito está vacío"})
        }

        // const purchaser = req.user.email;
        const products = cart.products
        let ticketAmount = 0;
        const purchase = req.user.email

        const productsNotAdded = [];

        for (let i = 0; i < products.length; i++) {
          const product = await productById(products[i].producto);
        
          if (!product) {
            return res.status(400).json({ error: "Product not found" });
          }
          if (product.stock < products[i].quantity) {
            // return res.status(400).json({ error: "Insufficient stock" });

            // productsNotAdded.push({product: product, quantity: products[i].quantity});
            productsNotAdded.push({product: product._id});

            console.log(`Product ${product.description} discarded due to insufficient stock (${product.stock})`);
            continue;
          }
          ticketAmount += product.price * products[i].quantity;
        }

        // if (productsNotAdded.length > 0) {
        //   return res.status(400).json({ error: "Some products could not be added to the cart", productsNotAdded });
        // }
        
        const ticket = new ticketModel({
            code: generateUniqueCode("TCKT"),
            amount: ticketAmount,
            purchase:purchase,
        });
        
        for (let i = 0; i < products.length; i++) {
          const product = products[i]
            if(productsNotAdded.find(p => p.product === product.producto._id)){
              continue
            }
            // await productUpdate(products[i].producto._id, {
            //   stock: products[i].producto.stock - products[i].quantity,
            // });
            await productUpdate(product.producto._id, {
              stock: product.producto.stock - product.quantity,
            });
            // console.log(product.quantity);
            // await productQuantityUpdate(cart._id,product.producto._id, product.quantity);
          }
          
          
          for (let i = 0; i < cart.products.length; i++) {
            const product = cart.products[i];
            if (productsNotAdded.find(p => p.product === product.producto.toString())) {
                // If the product is not added, remove it from the cart
                await prodCarDelete(cart.id, product._id);
            }
        }
        
        
        
        // console.log(ticket);
        await ticket.save();
        // await carDelete(cart.id);
        await CarProductsDeleteShop(req, res);
        return res.status(200).json({ ticket: ticket, message: "Purchase successful" ,  "product is not stock":productsNotAdded});
        
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" , cause: error.message});
    }
  };