// const fs = require('fs');
import fs from 'fs'


export class ProductManager {
    constructor(path){
        this.path = path
    }

    async getProducts(limit){
        try{
            if(fs.existsSync(this.path)){
                const ProductInfo = await fs.promises.readFile(this.path, 'utf-8');
                if(limit === "max"){
                    const ProductInfoJs = JSON.parse(ProductInfo);
                    return ProductInfoJs   
                }else {
                    return JSON.parse(ProductInfo).slice(0, limit)
                }
            }else return []  
        }catch(error){
            console.log(error);
        }
    }

    async addProducts(code,title,description,price,thumbnail,stock){
        try{
            const camposValidos = (!code || !title || !description || !price || !thumbnail || !stock || stock < 0)
            if(!camposValidos){
                const EvaluarCode = await this.#evaluarCode(code);
                if(EvaluarCode) {
                    console.log(`Codigo {${code}} existe en base de datos`);
                    console.log(`Code {${code}} in database`);

                }else {
                    const crearProducto = {
                        id: await this.#generarId(),
                        code,
                        title,
                        description,
                        price,
                        thumbnail,
                        stock,  
                    }
                    crearProducto.fecha=new Date()
                    const ProductInfo = await this.getProducts()
                    ProductInfo.push(crearProducto);
                    fs.promises.writeFile(this.path,JSON.stringify(ProductInfo))
                }
            }else {
                console.log("Error,campos sin rellenar");
                return "error"                
            }    
        }catch(error){
            console.log(error);
        }
    
    }
    async getProductsByid(id){
        try{
            if(fs.existsSync(this.path)){
                const ProductInfo = await this.getProducts()
                const productId = await this.#evaluarId(id)
                if(productId){
                    console.log(productId);
                    return productId;
                }else return 'Product not found';
            }
        }catch(error){
            console.log(error);
        }
    }

    async updateProduct(id,change){
        let ProductInfo = await this.getProducts()
        let product = await this.getProductsByid(id);
        if(product){
            product = {...product, ...change}
            ProductInfo = ProductInfo.map(prod => {
                if(prod.id == product.id){
                    prod = product
                }
                return prod;
            })
            ProductInfo = JSON.stringify(ProductInfo)
            await fs.promises.writeFile(this.path, ProductInfo)
            return ProductInfo;
        }else {
            return null;
        }
    }

    async deleteProduct(id){
        let ProductInfo = await this.getProducts()
        let product = await this.getProductsByid(id);
        if(product){
            const FilterProduct = ProductInfo.filter(prod => prod.id != id)
            await fs.promises.writeFile(this.path,JSON.stringify(FilterProduct))
            console.log(`id ${id} eliminado`)
            console.log(`id ${id} removed`)

            return FilterProduct;
        }
    }

    async deleteAll() {
        if(fs.existsSync(this.path)){
            let ProductInfo = await this.getProducts()
            ProductInfo = []
            console.log(ProductInfo);
            return fs.promises.writeFile(this.path,JSON.stringify(ProductInfo))
        }
    }
    async viewDatabase(){
        const ProductInfo = await this.getProducts()
        console.log(ProductInfo);
    }

    async #generarId(){
        const ProductInfo = await this.getProducts()
        let id = 
        ProductInfo.length === 0 ? 1 : ProductInfo[ProductInfo.length -1].id + 1
        return id 
    }

    async #evaluarId(id){
        const ProductInfo = await this.getProducts()
        return ProductInfo.find(product => product.id === parseInt(id));
    }

    async #evaluarCode(code){
        const ProductInfo = await this.getProducts()
        return ProductInfo.find(product => product.code === code)
    }

}
       
const Product = new ProductManager('../product.json')

async function test(){
    
    // //Agregar producto
    // await Product.addProducts('abc1','pantalon','pantalon largo','6500','sin imagen',10)
    
    //Agregar segundo producto
    // await Product.addProducts('abc2','remera','remera manga larga','2500','sin imagen',20)

    //Agregar tercer producto
    // await Product.addProducts('abc3','remera','remera manga larga','2500','sin imagen',25)

    //Agregar cuarto producto
    // await Product.addProducts('abc4','remera','remera manga larga','2500','sin imagen',25)
    
    //codigo repetido
    // await Product.addProducts('abc2','pantalon','pantalon largo','6500','sin imagen','10')
    
    //ver listado de productos
    // Product.viewDatabase()

    //Busqueda por id de producto
    // await Product.getProductsByid(1)

    //Busqueda de producto por id no encontrado
    // Product.getProductsByid(10)

    //Actualizar producto
    // Product.updateProduct(1, {'description': 'pantalon corto'})

    //Borrar producto
    // Product.deleteProduct(1);

    //Borrar todo
    // Product.deleteAll();
}

test()

























