// class ProductManager {
//     constructor(){
//         this.products = []
//     }

//     addProducts(code,title,description,price,thumbnail,stock){
            
//         const primeraValidacion = (!code || !title || !description || !price || !thumbnail || !stock, stock < 0)
//             if(primeraValidacion){
//                 console.log("Error,campos sin rellenar");
//                 return "error"
//             }    

//         const evento = {
//             id: this.#generarId(),
//             code,
//             title,
//             description,
//             price,
//             thumbnail,
//             stock,
//         }
        
//         const validar =  this.products.find((prod) => prod.code === code)
//         validar ? console.log(`¡Codigo ${validar.code} ya existente!`) : this.products.push(evento);
//     }
    
//     #generarId(){
//         const id = 
//         this.products.length === 0 ? 1 : this.products[this.products.length -1].id + 1
//         return id
//     }
//     getProducts(){
//         return this.products
//     }
    
//     getProductsByid(id){
//         const product = this.products.find((product) => product.id === id)
//          if(product) return product    
//          else return "Not found"     
//     }

// }
// const producto = new ProductManager()

// producto.addProducts( "ab1","Remera","Remera lisa con estampado", 3950,"https://http2.mlstatic.com/D_NQ_NP_755146-MLA46522691113_062021-O.webp",10)

// producto.addProducts("ab2","Pantalon","Pantalon vaquero",5000,"https://http2.mlstatic.com/D_NQ_NP_612800-MLA43056586751_082020-O.webp", 15 )

// producto.addProducts("ab3","Campera","Campera microfibra", 10990,"https://http2.mlstatic.com/D_NQ_NP_607807-MLA52400120702_112022-O.webp", 8)
// //Duplicado
// producto.addProducts("ab3","Remera","Remera manga larga", 3950,"https://http2.mlstatic.com/D_NQ_NP_755146-MLA46522691113_062021-O.webp",10)

// producto.addProducts("ab4","Remera","Remera manga larga", 3950,"https://http2.mlstatic.com/D_NQ_NP_755146-MLA46522691113_062021-O.webp",0)

// //Con faltantes
// // producto.addProducts("ab5","Remera","Remera manga larga")



// console.log(producto);
