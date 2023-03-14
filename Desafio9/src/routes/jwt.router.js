import {Router} from 'express'
import { generateToken, comparePasswords  } from '../utils.js'
import { usersModel } from '../persistencia/dao/models/users.model.js'
import { jwtValidation } from '../middlewares/jwt.middlewares.js'
import  passport  from 'passport'
const router = Router()

//JWT CON LOCALSTORAGE
// router.post('/login', async(req,res)=>{
//     const {email,password} = req.body
//     const usuario = await usersModel.findOne({email})
//     if(usuario){
//         const isPassword = await comparePasswords(password,usuario.password)
//         if(isPassword){
//             const token = generateToken(usuario)
//             // console.log(token);
//             return res.json({token})
//         }
//         return res.json({message: 'Usuario o contraseña invalido'})
//     }    
// })

//Ruta a la que se dirije EnviarInfo con localStorage
// router.get('/loginJwtPassport', passport.authenticate('jwt', {session:false}),(req,res)=>{
//     console.log('Passport Jwt LocalStorage');
//     res.json({message: 'Passport Jwt'})
// })



//JWT CON COOKIES
router.post('/login', async(req,res)=>{
    const {email,password} = req.body
    const usuario = await usersModel.findOne({email})
    if(usuario){
        const isPassword = await comparePasswords(password,usuario.password)
        if(isPassword){
            const token = generateToken(usuario)
            return res.cookie('token',token).json({token})
            // ,{httpOnly:true}
        }
        return res.status(401).json({message: 'Usuario o contraseña invalido'})
    }
})

//Ruta a la que se dirije EnviarInfo con Cookies
router.get('/loginJwtPassport', passport.authenticate('jwtCookies', {session:false}),(req,res)=>{
    console.log('Passport Jwt Cookies');
    res.json({message: 'Passport Jwt'})
})


//Validation con localStora o Cookies
router.get('/validation', jwtValidation,(req,res)=>{
    res.json({user:req.user})
})
export default router