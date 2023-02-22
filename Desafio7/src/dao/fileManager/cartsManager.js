import fs from "fs";
import { json } from "express";

export default class CartsManager {
  constructor(path) {
    this.path = path;
  }

  async getAll(limit) {
    try {
      if (fs.existsSync(this.path)) {
        const carInfo = await fs.promises.readFile(this.path, "utf-8");
        if (limit === "max") {
          const carInfoJs = JSON.parse(carInfo);
          return carInfoJs;
        } else {
          return JSON.parse(carInfo).slice(0, limit);
        }
      } else return [];
    } catch (error) {
      console.log(error);
    }
  }

  async createCar(obj) {
    try {
      const carFile = await this.getAll();
      let id = await this.#generarId();
      const newCar = { id, ...obj };
      newCar.fecha = new Date().toLocaleString();
      carFile.push(newCar);
      await fs.promises.writeFile(this.path, JSON.stringify(carFile));
      return newCar;
    } catch (error) {
      return error;
    }
  }

  async getCarByid(id) {
    try {
      if (fs.existsSync(this.path)) {
        const carId = await this.#evaluarId(id);
        return carId;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateCar(pid, obj) {
    try {
      const carInfo = await this.getAll();
      const car = carInfo.findIndex((p) => p.id === pid);
      const updateProd = { ...carInfo[car], ...obj };
      carInfo.splice(car, 1, updateProd);
      await fs.promises.writeFile(this.path, JSON.stringify(carInfo));
      return updateProd;
    } catch (error) {
      return error;
    }
  }

  async deleteCar(id) {
    let carInfo = await this.getAll();
    let car = await this.getCarByid(id);
    if (car) {
      const filterCar = carInfo.filter((prod) => prod.id != id);
      await fs.promises.writeFile(this.path, JSON.stringify(filterCar));
      console.log(`id ${id} eliminado`);
      console.log(`id ${id} removed`);

      return car;
    }
  }

  async deleteAll() {
    if (fs.existsSync(this.path)) {
      let carInfo = await this.getAll();
      carInfo = [];
      console.log(carInfo);
      return fs.promises.writeFile(this.path, JSON.stringify(carInfo));
    }
  }

  async #generarId() {
    const carInfo = await this.getAll();
    let id = carInfo.length === 0 ? 1 : carInfo[carInfo.length - 1].id + 1;
    return id;
  }

  async #evaluarId(id) {
    const carInfo = await this.getAll();
    return carInfo.find((product) => product.id === parseInt(id));
  }

  async #evaluarCode(code) {
    const ProductInfo = await this.getProducts();
    return ProductInfo.find((product) => product.code === code);
  }
}
