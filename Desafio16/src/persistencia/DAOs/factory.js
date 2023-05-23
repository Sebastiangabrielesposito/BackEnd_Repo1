import config from '../../config.js'
import cartsFile from './fileManager/cartsManager.js'
import cartsMongo from './mongoDB/mongoManager/cartsManager.js'
import ProductFile from './fileManager/productManager.js'
import ProductMongo from './mongoDB/mongoManager/productManager.js'
import {__dirname} from '../../utils.js';


let cartsManager
switch (config.PERSISTENCIA) {
    case 'MONGO':
        await import('../DAOs/mongoDB/dbConfig.js')
        cartsManager= new cartsMongo()
        break;

    case 'FILE':
    cartsManager= new cartsFile(__dirname + "/cart.json")
        break;
}



let productManager
switch (config.PERSISTENCIA) {
    case 'MONGO':
        await import('../DAOs/mongoDB/dbConfig.js')
        productManager= new ProductMongo()
        break;

    case 'FILE':
        productManager= new ProductFile(__dirname + "/product.json")
        break;
}

export  { cartsManager, productManager };


//Utilice este comando npm install --save-dev cross-env para poder usar file o mongo segun el script del package.json en este caso use ( "start-mongo": "cross-env PERSISTENCIA=MONGO nodemon src/app.js",
    // "start-file": "cross-env PERSISTENCIA=FILE nodemon src/app.js",)