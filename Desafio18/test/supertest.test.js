import supertest from "supertest";
import { expect } from "chai";
import ProductManager from '../src/persistencia/DAOs/mongoDB/mongoManager/productManager.js'

const userSuperTest = {
    first_name: 'PruebaSuperTest',
    last_name: 'SuperTest',
    email:'superTest@mail.com',
    age:11,
    password:'asd'

}
const request = supertest('http://localhost:8080')

const userSuperTest2 = {
    first_name: 'PruebaSuperTest2',
    last_name: 'SuperTest2',
    email:'superTest2@mail.com',
    age:11,
    password:'asd'

}

describe('Test de endpoint de Users con superTest', function(){
    it('Probar el metodo post(Registro) de /users',async function(){
        const response = await request.post('/users/registro').send(userSuperTest)
        expect(response.request._data).to.have.property('age')
        expect(response.request._data).to.have.property('password')
    })
    it('Debe hacer login el usuario arriba creado /users post(login)',async function(){
        const response = await request.post('/users/login').send(userSuperTest)
        // console.log(response._body);
        //Para probar este endpoint dirijirse al users.controller y la opcion de utlizar con superTest
        expect(response)
        expect(response._body).to.have.property('_id')
        expect(response._body).to.have.property('cart')
        expect(response._body).to.have.property('role')
    })
    it('Debe terminar la sesion del usuario metodo GET(logout) /users/logout',async function(){
        const response = await request.get('/users/login').send(userSuperTest)
        expect(response)
        expect(response).to.not.have.property('_id')
    })
})

describe('Test de endPoint de /messages con superTest', function(){
    const mensajeTest = {
        user: 'superTest2@mail.com',
        message:'Prueba mensaje superTest'
    }
    
    it('Debe agregar un mensaje a la base de datos metodo POST /messages',async function(){
        const response = await request.post('/messages').send(mensajeTest)
        expect(response)
    })
    it('Debe mostrar todos los mensajes de la base de datos metodo GET /messages',async function(){
        const response = await request.post('/messages').send()
        expect(response)
    })
    it('Debe mostrar un mensaje por id de la base de datos metodo GET /messages/:messageId',async function(){
        const messageId = '647a56843f25ce15c8907c47'; 
        const response = await request.get(`/messages/${messageId}`);
        // console.log(response._body.searchMessage);
        expect(response._body.searchMessage)
        expect(response._body.searchMessage).to.have.property('user')
        expect(response._body.searchMessage).to.have.property('message')
    })
})