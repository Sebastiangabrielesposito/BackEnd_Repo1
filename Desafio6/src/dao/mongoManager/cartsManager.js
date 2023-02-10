import { cartsModel } from "../models/carts.Model.js";

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
      // const obj = [];
      const newCar = await cartsModel.create(obj);
      return newCar;
    } catch (error) {
      console.log(error);
    }
  }

  async getCarByid(id) {
    try {
      const carById = await cartsModel.findById(id);
      return carById;
    } catch (error) {
      console.log(error);
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
}
