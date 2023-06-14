import { Router } from "express";
import { auth, isLogged } from "../middlewares/authentLogin.js";
import {registro,errorRegistro,login,errorLogin,addProducts,changePassword,nodemailerPassword,jwt,profileAddDocuments} from '../controllers/views.controller.js'
import { isAdmin,isAdminAndIsPremum } from "../middlewares/authentLogin.js";
import {checkExpiration} from '../middlewares/nodemailer.middlewares.js';
const router = Router();

router.get("/registro", isLogged,registro );

router.get("/errorRegistro", errorRegistro);

router.get("/login", isLogged,login );

router.get("/errorLogin", errorLogin);

router.get("/addProducts" ,isAdminAndIsPremum,addProducts );

router.get('/changePassword' , checkExpiration, changePassword)

router.get("/nodemailerPassword",nodemailerPassword)

router.get('/jwtFront', jwt)

router.get('/profileAddDocuments',profileAddDocuments)



export default router;
