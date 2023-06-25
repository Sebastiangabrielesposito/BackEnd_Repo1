import {
  getProductsAll,
  productCreate,
  productById,
  productDelete,
  productUpdate,
} from "../services/product.service.js";
import { json } from "express";
import { productModel } from "../persistencia/DAOs/mongoDB/models/products.model.js";
import {mocksProducts} from '../utils/mocks.js';
import CustomError from "../utils/errors/CustomError.js";
import {ProductErrorNames, ProductErrorMessages, ProductErrorCauses} from '../utils/errors/errors.enum.js';
import {usersModel} from '../persistencia/DAOs/mongoDB/models/users.model.js';
import { transporter } from "../messages/nodemailer.js";


export async function productsAll(req, res) {
  try {
    const { limit = 12, page = 1, category, sort } = req.query;
    const options = { limit, page, category };
    
    //img foto perfil user
    const userData = req.user

    const defaultProfileImage = '/images/default-profile-image.jpg';
    const profileImageURL = userData.img_profile.reference ? `/profiles/${userData.img_profile.reference}` : defaultProfileImage;
    const isDefaultProfileImage = !userData.img_profile.reference;
    
    console.log(req.session.email);
    if (sort) {
      options.sort = sort;
    }
    const products = await getProductsAll(options);
    if (!limit || !page || !category) {
      // res.json({ products });
      res.render("home", {
        prod: products,
        titulo: "Productos",
        email: req.session.email.split('@')[0],
        profileImageURL: profileImageURL,
        isDefaultProfileImage: isDefaultProfileImage
      });
    } else {
      const count = await productModel.countDocuments({ category });
      const totalPages = Math.ceil(count / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      const prevPage = hasPrevPage ? page - 1 : null;
      const nextPage = hasNextPage ? page + 1 : null;
      const prevLink = hasPrevPage
        ? `localhost:8080/api/products/?page=${prevPage}`
        : null;
      const nextLink = hasNextPage
        ? `localhost:8080/api/products/?page=${nextPage}`
        : null;

      res.json({
        status: "exitoso",
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      });
    }
  } catch (error) {
      CustomError.createCustomError({
        name: ProductErrorNames.GET_PRODUCT_ERROR,
        message: ProductErrorMessages.GET_PRODUCT_ERROR,
        cause: ProductErrorCauses.GET_PRODUCT_ERROR,
      })  
  }
}


export async function productId(req, res) {
  try {
    const { pid } = req.params;
    const product = await productById(pid);
    if (product) {
      res.render("productHome", { prod:product.toObject(), titulo: "ProductHome" , email: req.session.email.split('@')[0],});
      // res.status(200).json({ message: `Producto encontrado con exito`, product });
    } else {
        res.status(400).json({ message: "Product does not exist with that id" });
    }
  } catch (error) {
    CustomError.createCustomError({
      name: ProductErrorNames.GET_PRODUCT_ERROR,
      message: ProductErrorMessages.GET_PRODUCT_ERROR,
      cause: ProductErrorCauses.GET_PRODUCT_ERROR,
    })  
  }
}

export async function prodCreate(req,res){
    try{
        const obj = req.body;
        // const prod = await productCreate(obj)
        const email = req.session.email;
        const user = await usersModel.findOne({ email: email }); 
        if(user.role === "premium") {
          obj.owner = user._id
        }
        if(!obj.owner) {
          obj.owner = "admin"
        }
        console.log(obj.owner);
        const prod = await productCreate(obj)
        if(prod){
            
          //Ejecutar con fileSystem re dirije a todos los productos en localHost
            res.redirect("/api/products");

            //Ejecutar con mongo - para visualizar con thunderClient
            // res.json({ mesagge: `Producto creado con exito`, prod });
        } else{
            res.status(400).json({message:'Error creating the product'})
        }
    }catch(error){
        CustomError.createCustomError({
          name: ProductErrorNames.CREATE_PRODUCT_ERROR,
          message: ProductErrorMessages.CREATE_PRODUCT_ERROR,
          cause: ProductErrorCauses.CREATE_PRODUCT_ERROR,
        }) 
    }
}

export async function prodUpdate(req,res){
    try{
        const { pid } = req.params;
        const obj = req.body;
        const product = await productUpdate(pid,obj)
        if(product){
            res.status(200).json({message:'Product successfully modified', product})
        }else{
            res.status(400).json({message:'Error when modifying the product'})
        }
    }catch(error){
        CustomError.createCustomError({
          name: ProductErrorNames.UPDATE_PRODUCT_ERROR,
          message: ProductErrorMessages.UPDATE_PRODUCT_ERROR,
          cause: ProductErrorCauses.UPDATE_PRODUCT_ERROR,
        })  
    }
}

export async function prodDelete(req,res){
    try{
        const { pid } = req.params;
        const product = await productById(pid);

        if (!product) {
          return res.status(400).json({ message: 'There is no product with that id' });
        }
       
        if (req.user.role === 'premium' && product.owner.toString() === req.user._id.toString()) {
            await productDelete(pid);

            const mailOptions = {
              from: 'UniversalMarket.tienda@gmail.com',
              to: req.user.email,
              subject: 'Product Deleted',
              text: 'Your product has been successfully deleted.',
            };
      
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log('Error sending email:', error);
              } else {
                console.log('Email sent:', info.response);
              }
            });


        } else if (req.user.role === 'admin') {
            await productDelete(pid);
        } else {
          return res.status(401).json({ message: 'You can only delete products that belong to you' });
        }
        
        res.status(200).json({message:'Product removed successfully',product})
    }catch(error){
        CustomError.createCustomError({
          name: ProductErrorNames.DELETE_PRODUCT_ERROR,
          message: ProductErrorMessages.DELETE_PRODUCT_ERROR,
          cause: ProductErrorCauses.DELETE_PRODUCT_ERROR,
        })  
    }
}
export async function mockingProducts(req,res){
  try{
    const products = mocksProducts()
    res.json({ products: products })

  }catch(error){
    CustomError.createCustomError({
      name: ProductErrorNames.CREATE_PRODUCT_ERROR,
      message: ProductErrorMessages.CREATE_PRODUCT_ERROR,
      cause: ProductErrorCauses.CREATE_PRODUCT_ERROR,
    }) 
  }
} 