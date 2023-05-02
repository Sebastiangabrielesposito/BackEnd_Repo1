import {Router} from "express";
import {jwtValidation} from '../middlewares/jwt.middlewares.js';
import {RespuestaCookiesUser, ExtraerCookie} from '../controllers/users.controller.js';
import passport from 'passport';

const router = Router()
import{isAdmin} from '../middlewares/authentLogin.js' 


router.get("/current",jwtValidation, RespuestaCookiesUser);


//
// router.get('/currentSession', isAdmin,(req,res)=>{
//     res.render('currentSession', {titulo:'current'})
// })


router.get(
    "/cookieExtractor",
    passport.authenticate("current", { session: false }),
    ExtraerCookie
  );
export default router