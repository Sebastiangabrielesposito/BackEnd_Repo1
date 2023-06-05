import {__dirname, hashPassword, comparePasswords, generateToken} from '../utils.js';
import { usersModel } from "../persistencia/DAOs/mongoDB/models/users.model.js";
import logger from '../utils/winston/winston.js';
import CustomError from '../utils/errors/CustomError.js';
import {UserErrorNames, UserErrorMessages, UserErrorCauses} from '../utils/errors/errors.enum.js';
// import UserDBDTO from '../persistencia/DTOs/userDB.dto.js';
//fileStore

const users = [];
// console.log(users);

export async function userExists(u){
    try{
        const user = await usersModel.some((u) => u.email === req.body.email);
        return user
    }catch(error){
        CustomError.createCustomError({
            name:UserErrorNames.GET_USER_ERROR,
            message:UserErrorMessages.GET_USER_ERROR,
            cause:UserErrorCauses.GET_USER_ERROR
          });
    }
}

export async function searchUser(u){
    try{
        const user = await usersModel.find((u) => (u.email = email));
        return user
    }catch(error){
        CustomError.createCustomError({
            name:UserErrorNames.GET_USER_ERROR,
            message:UserErrorMessages.GET_USER_ERROR,
            cause:UserErrorCauses.GET_USER_ERROR
          });
    }
}

//mongo

//registro sin passport

export async function findOneUser(email){
    try{
        const user = await usersModel.findOne({ email });
        return user
    }catch(error){
        CustomError.createCustomError({
            name:UserErrorNames.GET_USER_ERROR,
            message:UserErrorMessages.GET_USER_ERROR,
            cause:UserErrorCauses.GET_USER_ERROR
          });
    }
}

// export async function createUser(user){
//     try{
//         const hash = await hashPassword(user.password)
//         const userDBDTO = new UserDBDTO({ ...user, password: hash })
//         console.log("userDBDTO");
//         const newUser = await usersModel.create(userDBDTO );
//         return newUser
//     }catch(error){
//        logger.error("error")
//     }
// }

export async function findUser(email){
    try{
        const user = await usersModel.find({ email });
        return user
    }catch(error){
        CustomError.createCustomError({
            name:UserErrorNames.GET_USER_ERROR,
            message:UserErrorMessages.GET_USER_ERROR,
            cause:UserErrorCauses.GET_USER_ERROR
          });
    }
}

export async function compareNewPassword(password,usuario){
    try{
        const compare = await comparePasswords(password, usuario[0].password);
        return compare
    }catch(error){
        CustomError.createCustomError({
            name:UserErrorNames.GET_USER_ERROR,
            message:UserErrorMessages.GET_USER_ERROR,
            cause:UserErrorCauses.GET_USER_ERROR
          });
    }
}

export async function newToken(userData){
    try{
        const token =  generateToken(userData)
        return token
    }catch(error){
       logger.error("error")
    }
}

//changePassword
export async function compareNewChangePassword(oldPassword,usuario){
    try{
        const compare = await comparePasswords(oldPassword, usuario[0].password);
        return compare
    }catch(error){
       logger.error("error")
    }
}

export async function createNewPassword(newPassword){
    try{
        const hash = await hashPassword(newPassword)
        return hash
    }catch(error){
       logger.error("error")
    }
}
