const fs = require('fs');


class ProductManager {
    constructor(){
        this.path = '../Desafio2/products.txt'
    }

        async writeFile(data) {
            try {
                await fs.promises.writeFile(
                    this.path, JSON.stringify(data, null, 2)
                )
            }catch(err) {
                console.log(`error: ${err}`);
            }    
        }    
        async getAll() {
            try {
                const productos = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(productos);
                
            }catch(err){
                if(err.message.includes('No esta archivo en directorio')) return [];
                console.log(`error: ${err}`);
            }
        }
        
        async save(obj) {
            try{
                let productos = await this.getAll();
                let  newId
                productos.length === 0 ? newId = 1 : newId = productos[productos.length-1].id + 1;
                let newObj = {...obj, id : newId};
                // const validar =  productos.find((prod) => prod.code === code)
                // validar ? console.log(`¡Codigo ${validar.code} ya existente!`) : productos.push(newObj);
                productos.push(newObj);
                await this.writeFile(productos)
                return newObj.id
                
            }catch(err){
                console.log(`error: ${err}`);
            }
        }

        async getById(id) {
            try{
                let productos = await this.getAll();
                const obj = productos.find(producto => producto.id === id);
                return obj ? obj : null;
            }catch(err){
                console.log(`error: ${err}`);
            }
        }

        async deleteById(id) {
            let productos = await this.getAll();
            try {
                productos = productos.filter(producto => producto.id != id);
                await this.writeFile(productos)
                return `id ${id} eliminado`
            }catch(err){
                console.log(`error: ${err}`);
            }   
        }

        async deleteAll() {
            await this.writeFile([])
            let productos = await this.getAll([]);
            return productos 
        }
    

}
// module.exports = ProductManager;
const products = new ProductManager('../Desafio2/products.txt')

const test = async () => {
    let save = await products.save({
        code: 'abc1',
        title: 'Remera',
        descrption: 'Remera manga larga lisa',
        price: 8000,
        thumbail:'https://http2.mlstatic.com/D_NQ_NP_607807-MLA52400120702_112022-O.webp',
        stock: 10
    });
    let saveTwo = await products.save({
        code: 'abc2',
        title: 'Pantalon',
        descrption: 'Pantalon largo',
        price: 12000,
        thumbail:'https://http2.mlstatic.com/D_NQ_NP_607807-MLA52400120702_112022-O.webp',
        stock: 15
    });
    
    
    // let getAll = await products.getAll();
    // let getById = await products.getById(2); 
    // let deleteById = await products.deleteById(2);
    // let getAllMod = await products.getAll();
    // let deleteAll = await products.deleteAll();
    // let getAllEmpty = await products.getAll();
    // console.log(getAll);
    // console.log(getById);
    // console.log(deleteById);
    // console.log(getAllMod);
    // console.log(deleteAll);
    // console.log(getAllEmpty);

    // let saveUno = await products.save({
    //     code: 'abc1',
    //     title: 'Remera',
    //     descrption: 'Remera manga larga lisa',
    //     price: 8000,
    //     thumbail:'https://http2.mlstatic.com/D_NQ_NP_607807-MLA52400120702_112022-O.webp',
    //     stock: 10
    // });
    // let saveDos = await products.save({
    //     code: 'abc2',
    //     title: 'Pantalon',
    //     descrption: 'Pantalon largo',
    //     price: 12000,
    //     thumbail:'https://http2.mlstatic.com/D_NQ_NP_607807-MLA52400120702_112022-O.webp',
    //     stock: 15
    // });
    // let saveThree = await products.save({
    //     code: 'abc3',
    //     title: 'Campera',
    //     descrption: 'Campera cuero',
    //     price: 18000,
    //     thumbail:'https://http2.mlstatic.com/D_NQ_NP_607807-MLA52400120702_112022-O.webp',
    //     stock: 8
    // }); 
    // let getFinally = await products.getAll();
    // let wanted = await products.getById(2);
    // console.log(getFinally);
    // console.log(wanted);
    // let delteleAllTime = await products.deleteAll();
    // console.log(delteleAllTime);
    // let getFinal = await products.getAll();
    // console.log(getFinal);
}
test();


