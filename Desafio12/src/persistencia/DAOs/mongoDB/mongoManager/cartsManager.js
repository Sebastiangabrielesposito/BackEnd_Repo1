import { cartsModel } from "../models/carts.model.js";

export default class CartsManager {
  async getAll() {
    try {
      const cars = cartsModel.find();
      return cars;
    } catch (error) {
      console.log(error);
    }
  }

  async createCar(obj) {
    try {
      const newCar = await cartsModel.create(obj);
      return newCar;
    } catch (error) {
      console.log(error);
    }
  }

  async getCarByid(id) {
    try {
      const carById = await cartsModel
        .findOne({ _id: id })
        .populate("products.producto")
        .exec();
      return carById;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCartProducts(cartId, products) {
    try {
      const updatedCart = await cartsModel
        .findById(cartId)
        .populate("products.producto")
        .exec();

      updatedCart.products = products;

      const savedCart = await updatedCart.save();

      return savedCart;
    } catch (error) {
      console.log(error);
      throw new Error("Error actualizando productos del carrito");
    }
  }

  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error(`No se encontró el carrito con id ${cartId}`);
      }
      const productIndex = cart.products.findIndex(
        (product) => product.producto._id.toString() === productId
      );
      if (productIndex === -1) {
        throw new Error(
          `No se encontró el producto con id ${productId} en el carrito ${cartId}`
        );
      }
      cart.products[productIndex].quantity = newQuantity;
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.log(error);
      throw new Error(
        "Error actualizando la cantidad del producto en el carrito"
      );
    }
  }

  async deleteCar(id) {
    try {
      const carDelete = await cartsModel.findByIdAndDelete(id);
      return carDelete;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductsCar(id) {
    try {
      const deleteProdsCar = await cartsModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error(`No se encontró el carrito con id ${cartId}`);
      }
      const productIndex = cart.products.findIndex(
        (product) => product.producto._id.toString() === productId
      );
      if (productIndex === -1) {
        throw new Error(
          `No se encontró el producto con id ${productId} en el carrito ${cartId}`
        );
      }
      cart.products.splice(productIndex, 1);
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.log(error);
      throw new Error("Error eliminando producto del carrito");
    }
  }

  async carProductsDelete(id) {
    try {
      let productsCarDelete = await cartsModel.findById(id);
      console.log(productsCarDelete.products);
      if (productsCarDelete.products) productsCarDelete.products = [];
      await productsCarDelete.save();
      return productsCarDelete;
    } catch (error) {
      console.log(error);
    }
  }
}
