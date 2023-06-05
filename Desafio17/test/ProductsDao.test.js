import '../src/persistencia/DAOs/mongoDB/dbConfig.js'
import ProductManager from '../src/persistencia/DAOs/mongoDB/mongoManager/productManager.js'
import {expect} from 'chai'

describe('Test product dao para mongoDB', function(){

    const productTest = {
        code: 'abcde',
        title: 'Protein prueba test',
        description: 'Prueba test product',
        price: 100,
        stock: 11,
        category:'Test',
        status: true
    }

    before(function(){
        this.productDao = new ProductManager()
    })

    it('debe retornar todos los productos',async function(){
        const result = await this.productDao.getAll()
        expect(result).to.exist
    })
    it('Debe retornar que el arrreglo no sea igual a 0', async function(){
        const result = await this.productDao.getAll()
        expect(result).to.not.have.lengthOf(0)
    })
    it('debe retornar un producto por id',async function(){
        const result = await this.productDao.getProductsByid('63f8e52116ef30bcf2dfd55d')
        expect(result).to.exist
    })
    it('debe retornar si el producto tiene una propiedad  id',async function(){
        const result = await this.productDao.getProductsByid('6400e2c17bfea808b272bcde')
        expect(result).to.have.property('_id')
    })
    it('debe retornar si el producto tiene una propiedad  id',async function(){
        const result = await this.productDao.getProductsByid('6400e3047bfea808b272bce2')
        expect(result).to.have.property('price')
    })
    it('debe crear un producto en base de datos',async function(){
        const result = await this.productDao.createProduct(productTest)
        expect(result).to.exist
    })
    //Utilizar con el id del producto test creado arriba
    // it('Debe eliminar un producto de la base de datos',async function(){
    //     const result = await this.productDao.deleteProduct('6478dface0d488c58bf67b3c')
    //     expect(result).to.exist
    // })
})