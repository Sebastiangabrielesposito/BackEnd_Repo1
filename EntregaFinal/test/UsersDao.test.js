import {hashPassword,comparePasswords} from '../src/utils.js';
import UserDBDTO from '../src/persistencia/DTOs/userDB.dto.js';
import { expect } from 'chai';
import '../src/persistencia/DAOs/mongoDB/dbConfig.js'

const userTest = {
    first_name: 'PruebaTest',
    last_name: 'Test',
    email:'Test@mail.com',
    age:11,
    password:'asd'

}


describe('Testear funcionalidades Bcript(hashPassword,comparePasswords', function(){

    
    it('Probar que contraseña hasheada sea distinta a la original del usuario',async function(){
        const hash = await hashPassword(userTest.password)
        expect(hash).to.not.equal(userTest.password)
    })
    it('Probar que contraseña hasheada coincide con la del usuario',async function(){
        const hash = await hashPassword(userTest.password)
        const result = await comparePasswords(userTest.password,hash)
        expect(result).to.be.equal(true)
    })
    it('Probar que contraseña hasheada alterada falle al comparar',async function(){
        const hash = 'dsa'
        const result = await comparePasswords(userTest.password,hash)
        expect(result).to.be.equal(false)
    })

})

describe('Testear User DTO',function(){
    it('Probar que Dto agrupe nombre y apellido en una misma propiedad', function(){
        const userDTO = new UserDBDTO(userTest)
        expect(userDTO.full_name).to.be.equal(`${userTest.first_name} ${userTest.last_name}`)
    })
    it('Eliminar propiedades innecesarias', function(){
        const userDTO = new UserDBDTO(userTest)
        expect(userDTO.full_name).to.not.have.property('password')
        expect(userDTO.full_name).to.not.have.property('first_name')
        expect(userDTO.full_name).to.not.have.property('last_name')
        expect(userDTO).to.have.property('full_name')
    })
})