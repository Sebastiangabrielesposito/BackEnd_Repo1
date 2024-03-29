import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usersModel } from "../persistencia/dao/models/users.model.js";
import { hashPassword, comparePasswords } from "../utils.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from '../config.js'

//passport local Registro
passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name, age } = req.body;
        if (!first_name || !last_name || !age) {
          return done(null, false);
        }
        const usuario = await usersModel.find({ email });
        if (usuario.length !== 0) {
          return done(null, false);
        }
        const hashNewPassword = await hashPassword(password);
        const newUser = { ...req.body, password: hashNewPassword };
        const newUserBd = await usersModel.create(newUser);
        done(null, newUserBd);
      } catch (error) {
        done(error)
      }
    }
  )
);


//login Local Passport
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userDB = await usersModel.findOne({email})
        if(!userDB) return done(null,false)
        const compareNewPasswords = await comparePasswords(password,userDB.password)
        if(!compareNewPasswords) return done(null,false)
        if (email === "adminCoder@hotmail.com" && password === config.ADMIN_KEY) {
          // 'adminCod3r123'
          req.session.isAdmin = true;
          console.log(req.session.isAdmin);
        } else {
          req.session.isAdmin = false;
          console.log(req.session.isAdmin);
        }
        done(null,userDB)
      } catch (error) {
        done(error);
      }
    }
  )
);

//passport - Github
//Login
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: "Iv1.a1c4a2648f67802e",
      clientSecret: "e58822f60f5d15bf454728d060d254e3512fc1eb",
      callbackURL: "http://localhost:8080/users/github",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const usuario = await usersModel.findOne({ email: profile._json.email });
      if (!usuario) {
        done("El usuario no existe", null);
      } else {
        done(null, usuario);
      }
    }
  )
);
//Registro
passport.use(
  "githubRegistro",
  new GithubStrategy(
    {
      clientID: "Iv1.a1c4a2648f67802e",
      clientSecret: "e58822f60f5d15bf454728d060d254e3512fc1eb",
      callbackURL: "http://localhost:8080/users/github",
    },
    async (accessToken, refreshToken, profile, done) => {
      const usuario = await usersModel.findOne({ email: profile._json.email });
      if (!usuario) {
        const nuevoUsuario = {
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1] || " ",
          email: profile._json.email,
          password: " ",
        };
        const dbResultado = await usersModel.create(nuevoUsuario);
        done(null, dbResultado);
      } else {
        done(null, usuario);
      }
    }
  )
);

//Google passport
const email = ["elarka1989@gmail.com"];
// Login
passport.use(
  "googleLogin",
  new GoogleStrategy(
    {
      clientID:
        "1048782058683-14omnstks4peutrbpph1bu2m1pau7erl.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8080/users/google",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const usuario = await usersModel.findOne({ email: profile._json.email });
      if (!usuario) {
        done("El usuario no existe", null);
      } else {
        // email.push( profile._json.email)
        done(null, usuario);
      }
    }
  )
);

//Registro
passport.use(
  "googleRegistro",
  new GoogleStrategy(
    {
      clientID:
        "1048782058683-14omnstks4peutrbpph1bu2m1pau7erl.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8080/users/registro",
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      const usuario = await usersModel.findOne({ email: profile._json.email });
      if (!usuario) {
        const nuevoUsuario = {
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1] || " ",
          email: profile._json.email,
          password: " ",
        };
        const dbResultado = await usersModel.create(nuevoUsuario);
        done(null, dbResultado);
      } else {
        done(null, usuario);
      }
    }
  )
);


//funcion creada para usar en passport token en cookies
const cookieExtractor = (req) => {
  const token = req?.cookies?.token;
  return token;
};

//passport token en cookies
passport.use(
  "current",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: config.SECRET_KEY,
      // 'secretJwt'
    },
    async (jwtPayLoad, done) => {
      
      console.log("---jwtPayLoad", jwtPayLoad);
      done(null, jwtPayLoad.user);
    }
  )
);

//settings passport - debe colocarse siempre
passport.serializeUser((usuario, done) => {
  done(null, usuario._id);
});

passport.deserializeUser(async (_id, done) => {
  const usuario = await usersModel.findById(_id);
  done(null, usuario);
});
