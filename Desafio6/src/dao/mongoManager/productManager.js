import { productModel } from "../models/products.model.js";

export default class ProductManager {
  async getAll() {
    try {
      const product = productModel.find({});
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const newProduct = await productModel.create(obj);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsByid(id) {
    try {
      const productById = await productModel.findById(id);
      return productById;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productDelete = await productModel.findByIdAndDelete(id);
      return productDelete;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      const productUpdate = await productModel.findByIdAndUpdate(id, obj);
      return productUpdate;
    } catch (error) {
      console.log(error);
    }
  }
}
