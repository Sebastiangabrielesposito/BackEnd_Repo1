import { Router } from "express";
import { transporter } from "../messages/nodemailer.js";
import config from "../config.js";
import {__dirname} from '../utils.js'
import {nodemailerPassword} from '../controllers/nodemailer.controller.js';
// import {checkExpiration} from '../middlewares/nodemailer.middlewares.js';


const router = Router()

router.post("/",nodemailerPassword)


export default router