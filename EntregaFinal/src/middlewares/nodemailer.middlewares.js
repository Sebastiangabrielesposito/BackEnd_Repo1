import jwt from 'jsonwebtoken';
import config from "../config.js"
import logger from '../utils/winston/winston.js';

export function checkExpiration(req, res, next) {
    const token = req.query.token 
    // console.log(req.query.token );
    if (!token) {
      logger.info("Token no recibido");
      return res.redirect('/views/nodemailerPassword');
    }
    jwt.verify(token, config.token_nodemailer, (err, decoded) => {
      if (err) {
        return res.redirect('/views/nodemailerPassword');
      }
      const exp = decoded.exp;
      const expirationDate = new Date(exp * 1000);
      if (expirationDate <= new Date()) {
        return res.redirect('/views/nodemailerPassword');
      }
      logger.info("token válido");
      next();
    });
  }