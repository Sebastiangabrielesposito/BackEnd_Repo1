import { Router } from "express";
import { usersModel } from "../persistencia/DAOs/mongoDB/models/users.model.js";
import { hashPassword, comparePasswords, generateToken } from "../utils.js";
import passport from "passport";
import { jwtValidation } from "../middlewares/jwt.middlewares.js";
import {
  fileLogin,
  fileRegistro,
  fileDestroy,
  dbRegistroSinPassport,
  dbLoginSinPassport,
  mongoRegistroPassport,
  mongoLoginPassport,
  ExtraerCookie,
  RespuestaCookiesUser,
  logout,
  github,
  google,
  changePassword,
} from "../controllers/users.controller.js";
import { isAdmin } from "../middlewares/authentLogin.js";

const router = Router();

//Filestore

// router.post("/registro", fileRegistro);

// router.post("/login", fileLogin);

// router.get("/logout", fileDestroy);

// Mongo

// registro sin passport
// router.post("/registro", dbRegistroSinPassport);

// login sin passport mongo
// router.post("/login", dbLoginSinPassport);

//mongo passport-registro

router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/views/errorRegistro",
    // successRedirect: "/api/products",
    passReqToCallback: true,
  }),
  mongoRegistroPassport
);

//mongo passport-login
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/views/errorLogin",
    // successRedirect: "/api/products",
    passReqToCallback: true,
  }),
  mongoLoginPassport
);


// extraer Cookie
router.get(
  "/cookieExtractor",
  passport.authenticate("current", { session: false }),
  ExtraerCookie
);

//respuesta Cookies usuario
// router.get("/session/current",isAdmin , jwtValidation, RespuestaCookiesUser);

//logout
router.get("/logout", logout);

//changePassword
router.put("/changePassword", changePassword);

//Registro y login Github
router.get(
  "/registroGithub",
  passport.authenticate("githubRegistro", {
    scope: ["user:email"],
  })
);

router.get(
  "/github",
  passport.authenticate("githubRegistro", {
    failureRedirect: "/views/errorRegistro",
  }),
  github
);

//login GItHub
router.get(
  "/loginGithub",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/github",
  passport.authenticate("github", { failureRedirect: "/views/errorLogin" }),
  github
);

//Login con Google
router.get(
  "/loginGoogle",
  passport.authenticate("googleLogin", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  })
);

router.get(
  "/google",
  passport.authenticate("googleLogin", {
    failureRedirect: "/views/errorLogin",
  }),
  google
);

//Registro y Login Google
router.get(
  "/registroGoogle",
  passport.authenticate("googleRegistro", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  })
);

router.get(
  "/registro",
  passport.authenticate("googleRegistro", {
    failureRedirect: "/views/errorLogin",
  }),
  google
);
export default router;
