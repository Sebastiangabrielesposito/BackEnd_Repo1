import { json } from "express";
import {
  userExists,
  searchUser,
  findOneUser,
  // createUser,
  findUser,
  compareNewPassword,
  newToken,
  compareNewChangePassword,
  createNewPassword,
} from "../services/users.service.js";
import { usersModel } from "../persistencia/DAOs/mongoDB/models/users.model.js";
import UserDBDTO from "../persistencia/DTOs/userDB.dto.js";
import UsersRespDTO from "../persistencia/DTOs/userResp.dto.js";
import CustomError from "../utils/errors/CustomError.js";
import {
  UserErrorNames,
  UserErrorMessages,
  UserErrorCauses,
} from "../utils/errors/errors.enum.js";
import nodemailer from 'nodemailer'
import { transporter } from "../messages/nodemailer.js";

//Filestore

export async function fileRegistro(req, res) {
  try {
    const existeUsuario = await userExists();
    if (existeUsuario) {
      res.redirect("/views/errorRegistro");
    } else {
      users.push(req.body);
      res.redirect("/views/login");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function fileLogin(req, res) {
  try {
    console.log(users);
    const { email, password } = req.body;
    const usuario = await searchUser();
    if (usuario && usuario.password === password) {
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
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function fileDestroy(req, res) {
  try {
    req.session.destroy((error) => {
      if (error) console.log(error);
      else res.redirect("/views/login");
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

//mongo

//registro sin passport

export async function dbRegistroSinPassport(req, res) {
  try {
    const { email, password } = req.body;
    const existeUsuario = await findOneUser(email);
    if (existeUsuario) {
      res.redirect("/views/errorRegistro");
    } else {
      const newUser = await createUser(req.body);
      for (const key in req.body) {
        req.session[key] = req.body[key];
      }
      res.redirect("/views/login");
    }
  } catch (error) {
    CustomError.createCustomError({
      name: UserErrorNames.GET_USER_ERROR,
      message: UserErrorMessages.GET_USER_ERROR,
      cause: UserErrorCauses.GET_USER_ERROR,
    });
  }
}

export async function dbLoginSinPassport(req, res) {
  try {
    const { email, password } = req.body;
    const usuario = await findUser(email);
    if (usuario.length !== 0) {
      const isPassword = compareNewPassword(password, usuario);

      if (isPassword) {
        for (const key in req.body) {
          req.session[key] = req.body[key];
        }
        req.session.logged = true;
        if (
          email === "adminCoder@hotmail.com" &&
          password === "adminCod3r123"
        ) {
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
  } catch (error) {
    CustomError.createCustomError({
      name: UserErrorNames.GET_USER_ERROR,
      message: UserErrorMessages.GET_USER_ERROR,
      cause: UserErrorCauses.GET_USER_ERROR,
    });
  }
}

//mongo passport-registro

export async function mongoRegistroPassport(req, res) {
  try {
    for (const key in req.body) {
      req.session[key] = req.body[key];
    }
    req.session.logged = true;
    return res.redirect("/api/products");
  } catch (error) {
    CustomError.createCustomError({
      name: UserErrorNames.GET_USER_ERROR,
      message: UserErrorMessages.GET_USER_ERROR,
      cause: UserErrorCauses.GET_USER_ERROR,
    });
  }
}

//login

export async function mongoLoginPassport(req, res) {
  try {
    const { email, password } = req.body;
    for (const key in req.body) {
      req.session[key] = req.body[key];
    }
    req.session.logged = true;
    const userData = req.user;
    const token = await newToken(userData);
    res.cookie("token", token);

    // Actualizar last_connection
    userData.last_connection = new Date();
    await userData.save();
    
    //UTILIZAR CON THUNDER CLIENT PARA /:cid/purchase
    // return res.json(req.user.email)

    //Utilizar con superTest
    // res.json(req.user)

    //utilizar para la vista handlebars login user
    return res.redirect("/api/products");

  } catch (error) {
    CustomError.createCustomError({
      name: UserErrorNames.GET_USER_ERROR,
      message: UserErrorMessages.GET_USER_ERROR,
      cause: UserErrorCauses.GET_USER_ERROR,
    });
  }
}

export async function ExtraerCookie(req, res) {
  try {
    console.log("Passport user Cookies");
    return res.json({ message: "Passport Jwt" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function RespuestaCookiesUser(req, res) {
  try {
    // log(req.user)
    const user = req.user;
    const userDBDTO = new UserDBDTO(user);
    const usersRespDTO = new UsersRespDTO(userDBDTO);
    return res.json({ user: usersRespDTO });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function logout(req, res) {
  try {
    req.session.destroy((error) => {
      if (error) console.log(error);
      else return res.redirect("/views/login");
    });
    // Actualizar last_connection
    const userData = req.user;
    userData.last_connection = new Date();
    await userData.save();
  } catch (error) {
    res.status(500).json({ error });
  }
}

//changePassword
export async function changePassword(req, res) {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const usuario = await findUser(email);
    if (usuario.length != 0) {
      const isPassword = await compareNewChangePassword(oldPassword, usuario);
      if (isPassword) {
        const user = usuario[0];
        const newPasswordHashed = await createNewPassword(newPassword);
        user.password = newPasswordHashed;
        await user.save();
        res.status(200).json({ message: "password update successful" });
      } else {
        return res.status(400).json({ message: "Incorrect user or password" });
      }
    } else {
      return res.status(400).json({ message: "Incorrect user or password" });
    }
  } catch (error) {
    CustomError.createCustomError({
      name: UserErrorNames.UPDATE_USER_ERROR,
      message: UserErrorMessages.UPDATE_USER_ERROR,
      cause: UserErrorCauses.UPDATE_USER_ERROR,
    });
  }
}

// Verificar si el usuario ha cargado los documentos requeridos para pasar de user a premium
function hasRequiredDocuments(user) {
  const requiredDocuments = ["identification", "bankStatement", "proofOfAddress"];
  return requiredDocuments.every(documentType => {
    return user.documents.some(document => document.name === documentType);
  });
}


//Admin update role user/premium ,premium/user
export async function updateUserRole(req, res,userId) {
  const { uid } = req.params;
  const user = await usersModel.findById(uid);
  // const users = await allUsers();
  // const user = users.find(user => user._id === userId);


  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    if (user.role !== "premium" && user.role !== "user") {
      return res
        .status(401)
        .json({ message: "User does not have a valid role" });
    }

    // Verificar si el usuario ha cargado los documentos requeridos
    if (user.role === "user" && !hasRequiredDocuments(user)) {
      return res.status(400).json({ message: "El usuario no ha terminado de procesar su documentación" });
    }  


    console.log("Rol actual del usuario:", user.role);
    user.role = user.role === "premium" ? "user" : "premium";
    console.log("Rol actual del usuario:", user.role);
    await user.save();
    res.redirect("/views/usersPanel")
    // res.json({ message: "User role updated", user });
  } catch (error) {
    CustomError.createCustomError({
      name: UserErrorNames.UPDATE_USER_ERROR,
      message: UserErrorMessages.UPDATE_USER_ERROR,
      cause: UserErrorCauses.UPDATE_USER_ERROR,
    });
  }
}


//Upload imagen/documents Users con Multer
function getDocumentType(fieldName) {
  switch (fieldName) {
    case "identification":
      return "identification";
    case "bankStatement":
      return "bankStatement";
    case "proofOfAddress":
      return "proofOfAddress";
    default:
      return null;
  }
}

//Upload imagen/documents Users con Multer
export async function usersUpload(req, res) {
  try {
    const uid = req.user._id;
    const files = req.files;
    
   console.log(files);
    const user = await usersModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
   
    const newDocuments = Object.keys(files).map((fieldname) => ({
      name: getDocumentType(fieldname),
      reference: files[fieldname][0].filename,
    }));
    console.log(newDocuments);

    if (newDocuments.length === 0) {
      return res.status(400).json({ message: "No se encontraron documentos válidos" });
    }
    user.documents = newDocuments
    // user.documents.push(newDocuments)
    await user.save();

    return res.status(200).json({ message: "Documentos subidos exitosamente" });
    // res.redirect('/api/products')
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function adminDeleteDocuments(req,res){
  try{
    const uid = req.params.uid;
    
    const user = await usersModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user.documents = []; 
    await user.save();
    console.log(`Documents User id ${uid} Removed`);
    res.redirect('/api/products')
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

//Upload image profile Users
export async function imgProfile(req, res) {
  try {
    const uid = req.user._id;
    const profileImage = req.file;

    const user = await usersModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.img_profile = {
      data: profileImage.originalname,
      contentType: profileImage. mimetype,
      reference: profileImage.filename,
    };
    await user.save();
    // return res.status(200).json({ message: "Imagen de perfil subida exitosamente" });
    return res.redirect("/api/products")
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

//Delete image profile user
export async function deleteImgProfile(req,res){
  try{
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (!user.img_profile) {
      return res.status(400).json({ message: "El usuario no tiene una foto de perfil" });
    }
    user.img_profile = null;
    await user.save();
    res.redirect('/api/products');
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar imagen de perfil" });
  }
}

//Upload images products Users
export async function uploadImagesProducts(req,res){
try{
  const  uid = req.user._id
  const files = req.files

  const user = await usersModel.findById(uid)
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  files.forEach((file) => {
    user.img_products.push({
      data: file.filename
    });
  });
  await user.save()
  // res.redirect('/api/products')
  res.json({message:"Imagen/es de producto subidas exitosamente"})

}catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al cargar imagenes de productos de usuario" });
  } 
}

//github registro y login

export async function github(req, res) {
  try {
    req.session.logged = true;
    req.session.email = req.user.email;
    return res.redirect("/api/products");
  } catch (error) {
    CustomError.createCustomError({
      name: UserErrorNames.GET_USER_ERROR,
      message: UserErrorMessages.GET_USER_ERROR,
      cause: UserErrorCauses.GET_USER_ERROR,
    });
  }
}

//google registro y login
export async function google(req, res) {
  try {
    req.session.logged = true;
    req.session.email = req.user.email;
    return res.redirect("/api/products");
  } catch (error) {
    CustomError.createCustomError({
      name: UserErrorNames.GET_USER_ERROR,
      message: UserErrorMessages.GET_USER_ERROR,
      cause: UserErrorCauses.GET_USER_ERROR,
    });
  }
}

export async function allUsers(req,res){
  try{
    const users = await usersModel.find()
    const userDBDTO = users.map(user => new UserDBDTO(user));
    const usersRespDTO = userDBDTO.map(userDBDTO => new UsersRespDTO(userDBDTO));
    // return res.json({message:"allUsers",usersRespDTO})
    return usersRespDTO
  }catch(error){
    console.log(error);
    CustomError.createCustomError({
      name: UserErrorNames.GET_USER_ERROR,
      message: UserErrorMessages.GET_USER_ERROR,
      cause: UserErrorCauses.GET_USER_ERROR,
    });
  }
}

export async function deleteUsersConexionTwoDays(req,res){
  try{
    const currentDate = new Date()
    const inactiveDateLimit = new Date(currentDate.getTime() - (2 * 24 * 60 * 60 * 1000))
    const inactiveUsers = await usersModel.find({ last_Connection: { $lt: inactiveDateLimit } });
    inactiveUsers.forEach(async user => {
      if(user.role !== "admin"){
        await usersModel.deleteOne({ _id: user._id });
      }

      const mailOptions = {
        from: "UniversalMarket.tienda@gmail.com",
        to: user.email,
        subject: "Eliminación de cuenta por inactividad",
        text: "Tu cuenta ha sido eliminada debido a la falta de actividad durante dos días. Si deseas volver a utilizar nuestros servicios, por favor regístrate nuevamente.",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error al enviar el correo electrónico:", error);
        } else {
          console.log("Correo electrónico enviado:", info.response);
        }
      });
    });
  }catch(error){
    console.log(error);
  }
} 

export async function deleteUser(req,res){
  try{
    const userId = req.params.uid;
    const user = await usersModel.findByIdAndDelete(userId)
    return res.redirect("/views/usersPanel")
  }catch(error){
    console.log(error);
    CustomError.createCustomError({
      name: UserErrorNames.GET_USER_ERROR,
      message: UserErrorMessages.GET_USER_ERROR,
      cause: UserErrorCauses.GET_USER_ERROR,
    });
  }
}