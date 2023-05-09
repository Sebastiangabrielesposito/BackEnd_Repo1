import {faker} from '@faker-js/faker'
faker.setLocale('es')


const generateProduct = () =>{
    const product = {
        name:faker.commerce.productName(),
        price:faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category:faker.commerce.department(),
        stock:faker.random.numeric(),
        image:faker.image.image()
    }
    return product
}

export const mocksProducts = () =>{
    const carrito = []
    for(let i = 0; i <100;i++){
        const product = generateProduct()
        carrito.push(product)
    }
    return carrito
}
