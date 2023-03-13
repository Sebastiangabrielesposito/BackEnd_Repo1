import {Router} from 'express'
import { generateToken, comparePasswords  } from '../utils.js'
import { usersModel } from '../persistencia/dao/models/users.model.js'
import { jwtValidation } from '../middlewares/jwt.middlewares.js'
import  passport  from 'passport'
const router = Router()

//LOCALSTORAGE
router.post('/login', async(req,res)=>{
    const {email,password} = req.body
    const usuario = await usersModel.findOne({email})
    if(usuario){
        const isPassword = await comparePasswords(password,usuario.password)
        if(isPassword){
            const token = generateToken(usuario)
            // console.log(token);
            return res.json({token})
        }
        return res.json({message: 'Usuario o contraseña invalido'})
    } 
    
})
//COOKIES
// router.post('/login', async(req,res)=>{
//     const {email,password} = req.body
//     const usuario = await usersModel.findOne({email})
//     if(usuario){
//         const isPassword = await comparePasswords(password,usuario.password)
//         if(isPassword){
//             const token = generateToken(usuario)
//             return res.cookie('token',token).json({token})
//         }
//     }
//         // return res.status(401).json({message: 'Usuario o contraseña invalido'})
// })


router.get('/validation', jwtValidation,(req,res)=>{
    res.json({user:req.user})
})

router.get('/login',  jwtValidation,(req,res)=>{
    console.log('local storage');
    // res.send('local Storage')
})

router.get('/loginJwtPassport', passport.authenticate('jwt', {session:false}),(req,res)=>{
    res.json({message: 'Passport Jwt'})
})
router.get('/loginJwtPassport', passport.authenticate('jwtCookies', {session:false}),(req,res)=>{
    res.json({message: 'Passport Jwt'})
})

export default router