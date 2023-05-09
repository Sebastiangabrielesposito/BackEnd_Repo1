import logger from '../utils/winston/winston.js';
export function auth(req, res, next) {
  if (req.session.logged) {
    if (req.user.role === "admin") {
      // req.session.cookie.expires = new Date(Date.now() + 3600000); // Aumenta la expiración en una hora
      req.session.cookie.maxAge = null;
      req.session.save();
    }
    next();
  } else {
    logger.info("Ejecutando middleware authentic:sessionExpired");
    res.redirect("/");
  }
}

export function isLogged(req, res, next) {
  if (req.session.logged) {
    logger.info("Ejecutando middleware isLogged");
    res.redirect("/api/products");
  } else {
    next();
  }
}

export function isAdmin(req,res,next){
  if(req.user.role === "admin") {
    next()
  }else{
    res.json({message:'NO AUTORIZADO'})
  }
}

export function isUser(req,res,next){
  if(req.user.role === "user") {
    next()
  }else{
    res.json({message:'SOLO PARA USUARIOS'})
  }
}


// export function loggedIn(req, res, next) {
//   if (req.session.logged) {
//     next();
//   } else {
//     console.log("Ejecutando middleware loggedIn");
//     res.redirect("/views/login");
//   }
// }