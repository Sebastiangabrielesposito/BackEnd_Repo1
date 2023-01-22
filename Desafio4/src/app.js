import { json } from 'express';
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

    async addProducts(obj){
        try {
            const usuariosArchivos = await this.getProducts()
            let id = await this.#generarId()
            const usuario = {id,...obj}
            usuario.fecha=new Date().toLocaleString()
            usuariosArchivos.push(usuario)
            await fs.promises.writeFile(this.path,JSON.stringify(usuariosArchivos))
            return  usuario
        }catch (error) {
            return error
        }
    }

    async getProductsByid(id){
        try{
            if(fs.existsSync(this.path)){
                const productId = await this.#evaluarId(id)
                return productId
            }
        }catch(error){
            console.log(error);
        }
    }

    async updateProduct(pid,obj){
        try{
            const ProductInfo = await this.getProducts()
            const product = ProductInfo.findIndex(p=>p.id===pid)
            const updateProd = {...ProductInfo[product],...obj}
            ProductInfo.splice(product,1,updateProd)
            await fs.promises.writeFile(this.path,JSON.stringify(ProductInfo))
            return updateProd
        }catch (error){
            return error
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