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
import { productById } from "../services/product.service.js";

export async function CartAll(req, res) {
  try {
    const cars = await getCartAll();
    if (cars.length === 0) {
      res.status(200).json({ message: "No cars" });
    } else {
      res.status(200).json({ message: "Cars Found", cars });
    }
  } catch (error) {
    res.status(500).json({ error });
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
    res.status(500).json({ error });
  }
}
export async function createCar(req, res) {
  try {
    const product = [];
    const newCar = await createOneCar({product});
    if (!newCar) {
      res.status(400).json({ message: "Error" });
    } else {
      res.status(200).json({ message: "Cart created successfully", newCar });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
//cid:product:pid
export async function productsInCar(req, res) {
    try {
    const { cid, pid } = req.params;
    const cars = await getCartAll();
    const car = await getCarId(cid);
    if (car) {
      const prod = await productById(pid);
      if (prod) {
        //con mongo
        const prodDuplicado = car.products.findIndex((p) =>
          p.producto.equals(prod)
        );
        //con filesystem
        // const prodDuplicado = car.products.findIndex(
        //   (p) => p.producto.toString() === prod.id.toString()
        // );
        if (prodDuplicado === -1) {
          car.products.push({ producto: prod.id, quantity: 1 });
        } else {
          car.products[prodDuplicado].quantity++;
        }
        const updatecar = car.id - 1;
        cars.splice(updatecar, 1, car);

        try {
          //CON FILESYSTEM
          // await fs.promises.writeFile(pathJSON, JSON.stringify(cars));
          //CON MONGO
          await car.save();
          res.status(200).json({ message: "Product added successfully" });
        } catch (err) {
          res.status(500).json({ message: "Error adding product" });
        }
      } else {
        res.status(400).json({ message: "There is not product with that id" });
      }
    } else {
      res.status(400).json({ message: "There is no cart with that id" });
    }
  } catch (error) {
    res.status(500).json({ error });
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
    res.status(500).json({ error });
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
    res.status(500).json({ error });
  }
}

// /:cid
export async function CarProductsDelete(req,res){
    try{
        const { cid } = req.params;
        const car = await deleteCarProducts(cid)
        if(car){
            res.status(200).json({message:'Cart emptied successfully', car})
        }else{
            res.status(400).json({message:'Cart does not exist with that id'})
        }
    }catch(error){
        res.status(500).json({error})
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
        res.status(500).json({error})
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
        res.status(500).json({error})
    }
}