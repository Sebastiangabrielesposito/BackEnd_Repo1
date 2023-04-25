import jwt from "jsonwebtoken";
import config from '../config.js'
import UserDBDTO from '../persistencia/DTOs/userDB.dto.js';
import UsersRespDTO from '../persistencia/DTOs/userResp.dto.js';

export function jwtValidation(req, res, next) {
  try{
    // console.log('req',req);
    const authorizationHeader = req.get("Authorization");
    // const token = authorizationHeader?.split(' ')[1]
    const token = authorizationHeader?.startsWith("Bearer")
      ? authorizationHeader.split(" ")[1]
      : req.cookies.token;
  
    // console.log(token);
    const isValid = jwt.verify(token, config.SECRET_KEY);
    // 'secretJwt'
    if (isValid) {
      // console.log(isValid);
      req.user = isValid.user;  
      next();
    } else {
      // res.json({ message: "Error autenticacion" });
      res.status(401).json({message: 'Error '})
    }
  } catch (error) {
    res.status(401).json({message: 'Error -> No existe Cookie'})
  }
}
