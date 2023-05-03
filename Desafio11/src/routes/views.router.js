import { Router } from "express";
import { auth, isLogged } from "../middlewares/authentLogin.js";
import {registro,errorRegistro,login,errorLogin,addProducts,changePassword,jwt} from '../controllers/views.controller.js'

const router = Router();

router.get("/registro", isLogged,registro );

router.get("/errorRegistro", errorRegistro);

router.get("/login", isLogged,login );

router.get("/errorLogin", errorLogin);

router.get("/addProducts",addProducts );

router.get('/changePassword', changePassword)

router.get('/jwtFront', jwt)

export default router;
