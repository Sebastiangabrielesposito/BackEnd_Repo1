import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usersModel } from "../persistencia/dao/models/users.model.js";
import { hashPassword } from "../utils.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

//passport local
passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const usuario = await usersModel.find({ email });
      if (usuario.length !== 0) {
        return done(null, false);
      }
      const hashNewPassword = await hashPassword(password);
      const newUser = { ...req.body, password: hashNewPassword };
      const newUserBd = await usersModel.create(newUser);
      done(null, newUserBd);
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
const email = ['elarka1989@gmail.com']
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
          password: ' ',
        };
        const dbResultado = await usersModel.create(nuevoUsuario);
        done(null, dbResultado);
      } else {
        done(null, usuario);
      }
    }
  )
);


// //passport/jwt
// passport.use('jwt', new jwtStrategy({
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: 'secretJwt'
// },async(jwtPayLoad,done)=>{
//   console.log('---jwtPayLoad',jwtPayLoad);
//   done(null,jwtPayLoad.user)
// }))

// //passport token en cookies
// const cookieExtractor = (req)=>{
//   const token = req?.cookies?.token
//   return token
// }

// passport.use('jwtCookies', new jwtStrategy({
//   jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
//   secretOrKey: 'secretJwt'
// },async(jwtPayLoad,done)=>{
//   console.log('---jwtPayLoad',jwtPayLoad);
//   done(null,jwtPayLoad.user)
//   }))

//settings passport - debe colocarse siempre
passport.serializeUser((usuario, done) => {
  done(null, usuario._id);
});

passport.deserializeUser(async (_id, done) => {
  const usuario = await usersModel.findById(_id);
  done(null, usuario);
});
