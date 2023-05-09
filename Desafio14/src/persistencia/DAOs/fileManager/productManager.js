import { json } from "express";
import fs from "fs";
import logger from '../../../utils/winston/winston.js';

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getAll(options) {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const parsedProducts = JSON.parse(products);
        if (!options || !options.limit) {
          return parsedProducts;
        }
        return parsedProducts.slice(0, options.limit);
      } else {
        return [];
      }
    } catch (error) {
      logger.error("error");
    }
  }

  async createProduct(obj) {
    try {
      const productArchivos = await this.getAll();
      let id = await this.#generarId();
      const product = { id, ...obj };
      product.fecha = new Date().toLocaleString();
      productArchivos.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(productArchivos));
      return product;
    } catch (error) {
      logger.error("error");
    }
  }

  async getProductsByid(id) {
    try {
      if (fs.existsSync(this.path)) {
        const productId = await this.#evaluarId(id);
        return productId;
      }
    } catch (error) {
      logger.error("error");
    }
  }

  async updateProduct(pid, obj) {
    try {
      const ProductInfo = await this.getAll();
      const product = ProductInfo.findIndex((p) => p.id === parseInt(pid));
      const updateProd = { ...ProductInfo[product], ...obj };
      ProductInfo.splice(product, 1, updateProd);
      await fs.promises.writeFile(this.path, JSON.stringify(ProductInfo));
      return updateProd;
    } catch (error) {
      logger.error("error")
    }
  }

  async deleteProduct(id) {
    let ProductInfo = await this.getAll();
    let product = await this.getProductsByid(id);
    if (product) {
      const FilterProduct = ProductInfo.filter((prod) => prod.id != id);
      await fs.promises.writeFile(this.path, JSON.stringify(FilterProduct));
      logger.info(`id ${id} eliminado`);
      logger.info(`id ${id} removed`);

      return FilterProduct;
    }
  }

  async deleteAll() {
    if (fs.existsSync(this.path)) {
      let ProductInfo = await this.getAll();
      ProductInfo = [];
      logger.info(ProductInfo);
      return fs.promises.writeFile(this.path, JSON.stringify(ProductInfo));
    }
  }
  async viewDatabase() {
    const ProductInfo = await this.getAll();
    logger.info(ProductInfo);
  }

  async #generarId() {
    const ProductInfo = await this.getAll();
    let id =
      ProductInfo.length === 0 ? 1 : ProductInfo[ProductInfo.length - 1].id + 1;
    return id;
  }

  async #evaluarId(id) {
    const ProductInfo = await this.getAll();
    return ProductInfo.find((product) => product.id === parseInt(id));
  }

  async #evaluarCode(code) {
    const ProductInfo = await this.getAll();
    return ProductInfo.find((product) => product.code === code);
  }
}
