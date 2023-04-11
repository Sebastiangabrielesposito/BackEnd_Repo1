import { productModel } from "../models/products.model.js";

export default class ProductManager {
  
  async getAll(options) {
    try {
      const { limit = 12, page = 1, category, sort } = options || {};
      const skip = (page - 1) * limit;
      // const query = category ? { category } : {};
      const query = category
        ? { category: { $regex: category, $options: "i" } }
        : {};
      // const sortQuery = sort === "asc" ? { price: -1 } : { price: 1 };
      const sortQuery = {};
      if (sort) {
        const [field, direction] = sort.split(":");
        sortQuery[field] = direction === "asc" ? -1 : 1;
      } else {
        sortQuery.price = 1;
      }
      const products = await productModel
        .find(query)
        .skip(skip)
        .limit(Number(limit))
        // .sort({ price: 1 })
        .sort(sortQuery)
        .lean();
      return products;
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
      // const productById = await productModel.find({ _id: id });
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
