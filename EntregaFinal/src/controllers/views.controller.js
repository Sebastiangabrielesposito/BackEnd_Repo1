import { usersModel } from "../persistencia/DAOs/mongoDB/models/users.model.js";
import { productModel } from "../persistencia/DAOs/mongoDB/models/products.model.js";
import {allUsers,updateUserRole,deleteUser} from './users.controller.js';

export async function registro(req, res) {
  try {
    res.render("registro", { titulo: "registro" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
export async function errorRegistro(req, res) {
  try {
    res.render("errorRegistro", { titulo: "errorRegistro" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
export async function login(req, res) {
  try {
    res.render("login", { titulo: "login" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
export async function errorLogin(req, res) {
  try {
    res.render("errorLogin", { titulo: "errorLogin" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
export async function addProducts(req, res) {
  try {
    res.render("addProducts", { titulo: "addProducts" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
export async function changePassword(req, res) {
  try {
    res.render("changePassword", { titulo: "changePassword" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function nodemailerPassword(req, res) {
  try {
    res.render("nodemailerPassword", { titulo: "nodemailerPassword" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function jwt(req, res) {
  try {
    res.render("jwtFront", { titulo: "jwt" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function profileAddDocuments(req, res) {
  try {

    res.render("profileAddDocuments", { titulo: "Verificación de perfil" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function panelUsers(req,res){
  try{
    const users = await allUsers()
    res.render("usersPanel",{ users,titulo:"UsersPanel"})
  }catch(error){
    console.log(error);
  }
}

export async function carShop(req, res) {
  try {
    const userId = req.user._id;
    const user = await usersModel.findById(userId).populate("cart");
  
    const cartId = user.cart[0]._id;
    const products = user.cart[0].products;
    console.log(products);
 
    
    if (user && user.cart) {
      res.render("carshop", {
        titulo: "carShop",
        username: user.first_name,
        cartId,
        products: products,
      });
    } else {
      res.render("carshop", {
        titulo: "carShop",
        username: user.first_name,
        cartId,
        products: "No hay productos en el carrito",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
