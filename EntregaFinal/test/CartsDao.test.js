import '../src/persistencia/DAOs/mongoDB/dbConfig.js'
import CartsManager from '../src/persistencia/DAOs/mongoDB/mongoManager/cartsManager.js';
import {expect} from 'chai'
import assert from 'assert'
import { ObjectId } from 'mongodb';

describe('Test de Carts dao para mongoDB', function(){
    const cartData = {
        products: [
          {
            producto: ObjectId('644734b161064d266d0189bd'),
            quantity: 2,
          },
        ],
      };
    
    before(function(){
        this.CartsDao = new CartsManager()
    })

    it('Debe retornar si carts no es igual a un array en la base de datos(false)', async function(){
        const result = await this.CartsDao.getAll()
        assert.notEqual(Array.isArray(result),false)
    })
    it('Debe retornar si carts es igual a un array en la base de datos(true)',async function(){
        const result = await this.CartsDao.getAll()
        assert.equal(Array.isArray(result),true)
    })
    it('Debe buscar un carro por id en la base de datos',async function(){
        const result = await this.CartsDao.getCarByid('644734b161064d266d0199bd')
        expect(result).to.not.exist;
    })
    it('Debe retornar si existen carros en la base de datos', async function(){
        const result = await this.CartsDao.getAll()
        console.log(result);
        expect(result).to.exist;
    })
    it('Debe crear un carro en la base de datos', async function(){
        const result = await this.CartsDao.createCar(cartData)
        expect(result).to.exist
    })
    //Utilizar colocando el id  del carro creado con el test de arriba
    // it('Debe eliminar un carro en la base de datos', async function(){
    //     const result = await this.CartsDao.deleteCar('647792091e26b6a0a914a537')
    //     expect(result).to.exist
    // })
})
