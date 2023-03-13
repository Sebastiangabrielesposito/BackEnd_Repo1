import { Router } from "express";
import { usersModel } from "../persistencia/dao/models/users.model.js";
import { hashPassword, comparePasswords } from "../utils.js";
import passport from "passport";

const router = Router();

const users = [];
// console.log(users);

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
// registro sin passport
// router.post("/registro", async (req, res) => {
//   const { email, password } = req.body;
//   const existeUsuario = await usersModel.findOne({ email });
//   if (existeUsuario) {
//     res.redirect("/views/errorRegistro");
//   } else {
//     const hashNewPassword = await hashPassword(password);
//     const newUser = { ...req.body, password: hashNewPassword };
//     await usersModel.create(newUser);
//     for (const key in req.body) {
//       req.session[key] = req.body[key];
//     }
//     res.redirect("/views/login");
//   }
// });

//mongo passport-registro
router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/views/errorRegistro",
    // successRedirect: "/api/products",
    passReqToCallback: true,
  }),
  (req, res) => {
    for (const key in req.body) {
      req.session[key] = req.body[key];
    }
    req.session.logged = true;
    res.redirect("/api/products");
  }
);

//login comun mongo
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usuario = await usersModel.find({ email });
  if (usuario.length !== 0) {
    const isPassword = await comparePasswords(password, usuario[0].password);
    if (isPassword) {
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
      return res.redirect("/api/products");
    } else return res.redirect("/views/errorLogin");
  } else {
    return res.redirect("/views/errorLogin");
  }
});
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(error);
    else res.redirect("/views/login");
  });
});
router.put("/changePassword", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const usuario = await usersModel.find({ email });
  if (usuario.length != 0) {
    const isPassword = await comparePasswords(oldPassword, usuario[0].password);
    if (isPassword) {
      const user = usuario[0];
      user.password = await hashPassword(newPassword);
      await user.save();
      res.status(204).send();
      // res.json({message:'exitoso'})
    } else {
      res.status(400).send({ error: "Usuario o Contraseña  incorrecta" });
    }
  } else {
    res.status(400).send({ error: " Usuario o Contraseña incorrecta" });
  }
});

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
  async (req, res) => {
    req.session.logged = true;
    req.session.email = req.user.email;
    // console.log(req);
    res.redirect("/api/products");
  }
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
  async (req, res) => {
    req.session.logged = true;
    req.session.email = req.user.email;
    // console.log(req);
    res.redirect("/api/products");
  }
);

//Login con Gmail

router.get(
  "/loginGoogle",
  passport.authenticate("googleLogin", { scope: ['https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'] })
);

router.get(
  "/google",
  passport.authenticate("googleLogin", {
    failureRedirect: "/views/errorLogin",
  }),
  async (req, res) => {
    req.session.logged = true;
    req.session.email = req.user.email;
    // console.log(req);
    res.redirect("/api/products");
  }
);


//Registro y Login Google
router.get(
  "/registroGoogle",
  passport.authenticate("googleRegistro", { scope: ['https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'] })
);

router.get(
  "/registro",
  passport.authenticate("googleRegistro", {
    failureRedirect: "/views/errorLogin",
  }),
  async (req, res) => {
    req.session.logged = true;
    req.session.email = req.user.email;
    // console.log(req);
    res.redirect("/api/products");
  }
);
export default router;
