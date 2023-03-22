import { Router } from "express";
import { auth, isLogged } from "../middlewares/authentLogin.js";

const router = Router();

router.get("/registro", isLogged, (req, res) => {
  res.render("registro", { titulo: "registro" });
});
router.get("/errorRegistro",  (req, res) => {
  res.render("errorRegistro", { titulo: "errorRegristro" });
});
router.get("/login", isLogged, (req, res) => {
  res.render("login", { titulo: "Login" });
});
router.get("/errorLogin", (req, res) => {
  res.render("errorLogin", { titulo: "Error login" });
});
router.get("/addProducts", async (req, res) => {
  res.render("addProducts", { titulo: "addProducts" });
});
router.get('/changePassword', (req,res)=>{
  res.render('changePassword', {titulo: "ChangePassword"})
})
router.get('/jwtFront', (req,res)=>{
  res.render('jwt')
})

export default router;
