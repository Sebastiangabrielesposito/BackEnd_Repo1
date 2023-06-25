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
import { productById,getProductsAll } from "../services/product.service.js";
import { usersModel } from "../persistencia/DAOs/mongoDB/models/users.model.js";
import CustomError from '../utils/errors/CustomError.js';
import {CartErrorNames, CartErrorMessages, CartErrorCauses} from '../utils/errors/errors.enum.js';


export async function CartAll(req, res) {
  try {
    const cars = await getCartAll();
    if (cars.length === 0) {
      res.status(400).json({ message: "No cars" });
    } else {
      res.status(200).json({ message: "Cars Found", cars });
    }
  } catch (error) {
    CustomError.createCustomError({
      name: CartErrorNames.GET_CART_ERROR,
      message: CartErrorMessages.GET_CART_ERROR,
      cause: CartErrorCauses.GET_CART_ERROR,
    })  
  }
}

export async function CarById(req, res) {
    try {
    const { cid } = req.params;
    const carById = await getCarId(cid);
    if (carById) {
      res.status(200).json({ message: "Cart found successfully", carById });
    } else {
      res.status(400).json({ message: "Cart does not exist with that id" });
    }
  } catch (error) {
    CustomError.createCustomError({
      name: CartErrorNames.GET_CART_ERROR,
      message: CartErrorMessages.GET_CART_ERROR,
      cause: CartErrorCauses.GET_CART_ERROR,
    })  
  }
}
export async function createCarInUserRegister(userId,req, res) {
  try {
    const product = [];
    const newCar = await createOneCar(userId);
    const cartId = newCar._id;

    if (!newCar) {
      res.status(400).json({ message: "Error" });
    } 

    const user = await usersModel.findByIdAndUpdate(
      userId,
      { $push: { cart: cartId} },
      { new: true }
    );

    await user.save();
    // res.status(200).json({ message: "Cart created and associated to user", newCar })
  } catch (error) {
    console.error(error)
    CustomError.createCustomError({
      name: CartErrorNames.CREATE_CART_ERROR,
      message: CartErrorMessages.CREATE_CART_ERROR,
      cause: CartErrorCauses.CREATE_CART_ERROR,
    })  
  }
}

export async function createCar(req, res) {
  try {
    const userId = req.user._id
    
    const product = [];
    const newCar = await createOneCar({product});
    
    if (!newCar) {
      res.status(400).json({ message: "Error" });
    } 
  
  
    const user = await usersModel.findByIdAndUpdate(
      userId,
      { $push: { cart: newCar } },
      { new: true }
    );
    
    return res.status(200).json({ message: "Cart created and associated to user", newCar })
  } catch (error) {
    console.error(error)
    CustomError.createCustomError({
      name: CartErrorNames.CREATE_CART_ERROR,
      message: CartErrorMessages.CREATE_CART_ERROR,
      cause: CartErrorCauses.CREATE_CART_ERROR,
    })  
  }
}


//Crear un carro en usuario de forma manual/Solo ADMIN
export async function createCarAdmin(req, res) {
  try {
    const userId = req.params.userId
    
    const product = [];
    const newCar = await createOneCar({product});
    
    if (!newCar) {
      res.status(400).json({ message: "Error" });
    } 
  
  
    const user = await usersModel.findByIdAndUpdate(
      userId,
      { $push: { cart: newCar } },
      { new: true }
    );
    
    return res.status(200).json({ message: "Cart created and associated to user", newCar })
  } catch (error) {
    console.error(error)
    CustomError.createCustomError({
      name: CartErrorNames.CREATE_CART_ERROR,
      message: CartErrorMessages.CREATE_CART_ERROR,
      cause: CartErrorCauses.CREATE_CART_ERROR,
    })  
  }
}



export async function productsInCar(req, res) {
  try {
    
    //con thunderCliet
    // const { cid} = req.params;
    
    const {pid} = req.params
    const carId = req.user.cart
  const car = await getCarId(carId)
  if (car) {
    const prod = await productById(pid);
    if (prod) {
      const userId = req.user._id;
      const user = await usersModel.findById(userId);
      if (user.role === 'premium') {
        const productOwner = await usersModel.findOne({
          cart: carId,
          'products.producto': prod._id
        });
        if (productOwner) {
          return res.status(401).json({ message: 'Premium users cannot add their own products to the cart' });
        }
      }
      //con mongo
      const prodDuplicado = car.products.findIndex((p) =>
        p.producto.equals(prod)
      );
      
      //con filesystem
      // const prodDuplicado = car.products.findIndex(
      //   (p) => p.producto.toString() === prod.id.toString()
      // );
      
      if (prodDuplicado === -1) {
        car.products.push({ producto: prod, quantity: 1 });
        // user.cart.push(products[{ producto: prod._id.toString(), quantity: 1 }]);
      } else {
        car.products[prodDuplicado].quantity++;
      }
      const updatecar = car.id - 1;
      carId.splice(updatecar, 1, car);

        //CON FILESYSTEM
        // await fs.promises.writeFile(pathJSON, JSON.stringify(cars));
        
        //CON MONGO
        await user.save()
        await car.save();
        // res.status(200).json({ message: "Product added successfully" });
        res.redirect("/views/carShop")
    } else {
      res.status(400).json({ message: "There is not product with that id" });
    }
  } else {
    res.status(400).json({ message: "There is no cart with that id" });
  }
} catch (error) {
  console.log(error);
  CustomError.createCustomError({
    name: CartErrorNames.GET_CART_ERROR,
    message: CartErrorMessages.GET_CART_ERROR,
    cause: CartErrorCauses.GET_CART_ERROR,
  })  
}
}

// put :/cid
export async function modifiedCar(req, res) {
    try {
    const { cid } = req.params;
    const { products } = req.body;
    const updateCar = await carUpdate(cid, products);
    if (!updateCar) {
      res.status(400).json({ message: "Error updating cart products" });
    } else {
      res.status(200).json({ message: "Updated cart", updateCar });
    }
  } catch (error) {
    CustomError.createCustomError({
      name: CartErrorNames.UPDATE_CART_ERROR,
      message: CartErrorMessages.UPDATE_CART_ERROR,
      cause: CartErrorCauses.UPDATE_CART_ERROR,
    })  
  }
}

// router.put("/:cid/product/:pid"
export async function QuantityUpdate(req,res) {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;
    if (!cartId || !productId || !newQuantity) {
      return res.status(400).json({message:"Invalid parameters"});
    }
    const updateCar = await productQuantityUpdate(
      cartId,
      productId,
      newQuantity
    );
    if(updateCar){
        res.status(200).json({message:'Car updated successfully'})
    }else{
        res.status(400).json({message:
        'Error updating cart'})
    }
    // return updateCar
  } catch (error) {
    CustomError.createCustomError({
      name: CartErrorNames.UPDATE_CART_ERROR,
      message: CartErrorMessages.UPDATE_CART_ERROR,
      cause: CartErrorCauses.UPDATE_CART_ERROR,
    })  
  }
}

// /:cid
export async function CarProductsDelete(req,res){
    try{
        // const { cid } = req.params;
        const cid = req.user.cart[0].toString()
        console.log(cid);
        const car = await deleteCarProducts(cid)
        
        if(car){
             res.status(200).json({message:'Cart emptied successfully', car})
            
        }else{
            return res.status(400).json({message:'Cart does not exist with that id'})
        }
    }catch(error){
      console.log(error);
      CustomError.createCustomError({
        name: CartErrorNames.DELETE_CART_ERROR,
        message: CartErrorMessages.DELETE_CART_ERROR,
        cause: CartErrorCauses.DELETE_CART_ERROR,
      })  
    }
}

export async function CarProductsDeleteShop(req,res){
  try{
      // const { cid } = req.params;
      const cid = req.user.cart[0].toString()
      console.log(cid);
      const car = await deleteCarProducts(cid)
      
      // if(car){
      //      res.status(200).json({message:'Cart emptied successfully', car})
      // }else{
      //     return res.status(400).json({message:'Cart does not exist with that id'})
      // }
  }catch(error){
    console.log(error);
    CustomError.createCustomError({
      name: CartErrorNames.DELETE_CART_ERROR,
      message: CartErrorMessages.DELETE_CART_ERROR,
      cause: CartErrorCauses.DELETE_CART_ERROR,
    })  
  }
}


// .delete("/:cid/product/:pid)
export async function prodFromCarDelete(req,res){
    try{
        const { cid, pid } = req.params;
        const deleteProductCar = await productFromCarDelete(cid,pid)
        if(deleteProductCar){
            res.status(200).json({mesagge:'Successful',deleteProductCar})
        }else{
            res.status(400).json({message:'Error deleting product from cart'})
        }
    }catch(error){
      CustomError.createCustomError({
        name: CartErrorNames.DELETE_CART_ERROR,
        message: CartErrorMessages.DELETE_CART_ERROR,
        cause: CartErrorCauses.DELETE_CART_ERROR,
      })  
    }
}



// /delall/:cid
export async function carRemoved(req,res){
    try{
        const { cid } = req.params;
        const car = await carDelete(cid)
        if(car){
            res.status(200).json({message:'Cart deleted successfully',car})
        }else{
            res.status(400).json({message:'There is no cart with that id'})
        }
    }catch(error){
      CustomError.createCustomError({
        name: CartErrorNames.DELETE_CART_ERROR,
        message: CartErrorMessages.DELETE_CART_ERROR,
        cause: CartErrorCauses.DELETE_CART_ERROR,
      })  
    }
}

