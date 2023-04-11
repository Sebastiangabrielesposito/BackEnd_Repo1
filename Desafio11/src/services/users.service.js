import {__dirname, hashPassword, comparePasswords, generateToken} from '../utils.js';
import { usersModel } from "../persistencia/dao/models/users.model.js";

//fileStore

const users = [];
// console.log(users);

export async function userExists(u){
    try{
        const user = await users.some((u) => u.email === req.body.email);
        return user
    }catch(error){
        console.log(error);
    }
}

export async function searchUser(u){
    try{
        const user = await users.find((u) => (u.email = email));
        return user
    }catch(error){
        console.log(error);
    }
}

//mongo

//registro sin passport

export async function findOneUser(email){
    try{
        const user = await usersModel.findOne({ email });
        return user
    }catch(error){
        console.log(error);
    }
}

export async function createUser(user){
    try{
        const hash = await hashPassword(user.password)
        const newUser = await usersModel.create( { ...user, password: hash });
        return newUser
    }catch(error){
        console.log(error);
    }
}

export async function findUser(email){
    try{
        const user = await usersModel.find({ email });
        return user
    }catch(error){
        console.log(error);
    }
}

export async function compareNewPassword(password,usuario){
    try{
        const compare = await comparePasswords(password, usuario[0].password);
        return compare
    }catch(error){
        console.log(error);
    }
}

export async function newToken(userData){
    try{
        const token =  generateToken(userData)
        return token
    }catch(error){
        console.log(error);
    }
}

//changePassword
export async function compareNewChangePassword(oldPassword,usuario){
    try{
        const compare = await comparePasswords(oldPassword, usuario[0].password);
        return compare
    }catch(error){
        console.log(error);
    }
}

export async function createNewPassword(newPassword){
    try{
        const hash = await hashPassword(newPassword)
        return hash
    }catch(error){
        console.log(error);
    }
}
