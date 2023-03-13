export function auth(req, res, next) {
  if (req.session.logged) {
    next();
  } else {
    console.log("Ejecutando middleware authentic:sessionExpired");
    res.redirect("/");
  }
}
export function isLogged(req, res, next) {
  if (req.session.logged) {
    console.log("Ejecutando middleware isLogged");
    res.redirect("/api/products");
  } else {
    next();
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
