const { log } = require('console');
const fs = require('fs');

class ProductManager {
    constructor(){
        this.products = []
        this.path = '../Desafio2/products.json'
    }

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                    let ProductInfo = await fs.promises.readFile(this.path, 'utf-8');
                    let ProductInfoJs = JSON.parse(ProductInfo);
                    ProductInfoJs =  this.products
                    return console.log(ProductInfoJs); 

            }else return fs.promises.writeFile(this.path,JSON.stringify(this.products, null , 2))
        }catch(error){
            console.log(error);
        }
    }

    async addProducts(code,title,description,price,thumbnail,stock){
        try{
            const evaluarCampos = (!code || !title || !description || !price || !thumbnail || !stock, stock < 0)
            if(evaluarCampos){
                console.log("Error,campos sin rellenar");
                return "error"
            }else {
                const EvaluarCode = this.#evaluarCode(code);
                if(EvaluarCode) {
                    console.log(`Codigo {${code}} existe en base de datos`);
                    console.log(`Code {${code}} in database`);

                }else {
                    const evento = {
                        id: this.#generarId(),
                        code,
                        title,
                        description,
                        price,
                        thumbnail,
                        stock
                    }
                    this.products.push(evento);
                    await fs.promises.writeFile(this.path,JSON.stringify(this.products, null , 2))
                }
            }    
        }catch(error){
            console.log(error);
        }
    
    }
    async getProductsByid(id){
        try{
            if(fs.existsSync(this.path)){
                await fs.promises.readFile(this.path, 'utf-8')
                const productId = this.#evaluarId(id)
                if(productId){
                    console.log(productId);
                    return productId;
                }else {
                    console.log('Product not found');
                }
            }
        }catch(error){
            console.log(error);
        }
    }

    async updateProduct(id,change){
        let readFile = await fs.promises.readFile(this.path, 'utf-8')
        readFile = JSON.parse(readFile);
        let product = await this.getProductsByid(id);
        if(product){
            product = {...product, ...change}
            readFile = readFile.map(prod => {
                if(prod.id == product.id){
                    prod = product
                }
                return prod;
            })
            readFile = JSON.stringify(readFile, null ,2)
            await fs.promises.writeFile(this.path, readFile)
            console.log(JSON.parse(readFile));
            return readFile;
        }else {
            return null;
        }
    }

    async deleteProduct(id){
        let readFile = await fs.promises.readFile(this.path, 'utf-8')
        readFile= JSON.parse(readFile);
        let product = await this.getProductsByid(id);
        if(product){
            const FilterProduct = readFile.filter(prod => prod.id != id)
            await fs.promises.writeFile(this.path,JSON.stringify(FilterProduct, null , 2))
            console.log(`id ${id} eliminado`)
            console.log(`id ${id} removed`)

            return FilterProduct;
        }
    }

    async deleteAll() {
        if(fs.existsSync(this.path)){
            this.products = []
            this.getProducts(this.products)
            let readFile = await fs.promises.readFile(this.path, 'utf-8')
            readFile= JSON.parse(readFile);
            return fs.promises.writeFile(this.path,JSON.stringify(this.products, null , 2))
        }
    }
    // async viewDatabase(){
    //     let readFile = await fs.promises.readFile(this.path, 'utf-8')
    //         readFile= JSON.parse(readFile);
    //         console.log( readFile);
    // }

    #generarId(){
        const id = 
        this.products.length === 0 ? 1 : this.products[this.products.length -1].id + 1
        return id 
    }

    #evaluarId(id){
        return this.products.find(product => product.id === id);
    }

    #evaluarCode(code){
        return this.products.find(product => product.code === code)
    }

}

const product = new ProductManager()

//Iniciar array []
// product.getProducts();


// Agregar producto
product.addProducts('abc1','pantalon','pantalon largo','6500','sin imagen',10)

// //Agregar segundo producto
// product.addProducts('abc2','remera','remera manga larga','2500','sin imagen',20)


// //codigo repetido
// product.addProducts('abc2','pantalon','pantalon largo','6500','sin imagen','10')

//Busqueda por id de producto
// product.getProductsByid(4);

//Busqueda de producto por id no encontrado
// product.getProductsByid(10)

//Actualizar producto
// product.updateProduct(1, {'description': 'pantalon corto'})


//Borrar producto
// product.deleteProduct(2);


//Borrar todo
// product.deleteAll();

