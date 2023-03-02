import { Router } from "express";
import { usersModel } from "../persistencia/dao/models/users.model.js";

const router = Router();

const users = [];
console.log(users);

//Filestore
// router.post("/registro", (req, res) => {
//   const existeUsuario = users.some((u) => u.email === req.body.email);
//   if (existeUsuario) {
//     res.redirect("/views/errorRegistro");
//   } else {
//     users.push(req.body);
//     res.redirect("/views/login");
//   }
// });
// router.post("/login", (req, res) => {
//   console.log(users);
//   const { email, password } = req.body;
//   const usuario = users.find((u) => (u.email = email));
//   if (usuario && usuario.password === password) {
//     for (const key in req.body) {
//       // console.log(req.body[key]);
//       req.session[key] = req.body[key];
//     }
//     req.session.logged = true;
//     if (email === "adminCoder@hotmail.com" && password === "adminCod3r123") {
//       req.session.isAdmin = true;
//       console.log(req.session.isAdmin);
//     } else {
//       req.session.isAdmin = false;
//       console.log(req.session.isAdmin);
//     }
//     res.redirect("/api/products");
//   } else {
//     res.redirect("/views/errorLogin");
//   }
// });
// router.get("/logout", (req, res) => {
//   req.session.destroy((error) => {
//     if (error) console.log(error);
//     else res.redirect("/views/login");
//   });
// });

//Mongo
router.post("/registro", async (req, res) => {
  const { email, password } = req.body;
  const existeUsuario = await usersModel.findOne({ email });
  if (existeUsuario) {
    res.redirect("/views/errorRegistro");
  } else {
    await usersModel.create(req.body);
    for (const key in req.body) {
      req.session[key] = req.body[key];
    }
    res.redirect("/views/login");
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usuario = await usersModel.findOne({ email, password });
  if (usuario) {
    for (const key in req.body) {
      req.session[key] = req.body[key];
    }
    req.session.logged = true;
    if (email === "adminCoder@hotmail.com" && password === "adminCod3r123") {
      req.session.isAdmin = true;
      console.log(req.session.isAdmin);
    } else {
      req.session.isAdmin = false;
      console.log(req.session.isAdmin);
    }
    res.redirect("/api/products");
  } else {
    res.redirect("/views/errorLogin");
  }
});
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(error);
    else res.redirect("/views/login");
  });
});
export default router;
