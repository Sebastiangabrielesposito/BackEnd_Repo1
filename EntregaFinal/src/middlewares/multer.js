import multer from "multer";
import { __dirname } from "../utils.js";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/images");
  },
  filename: function (req, file, cb) {
 
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    cb(null, __dirname + "/public/documents");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    const filename = file.fieldname + "-" + uniqueSuffix + '.' + extension;

    cb(null, filename);
  },
});
export const userUpload = multer({ storage: userStorage });

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,__dirname + "/public/profiles");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname
    const filename = file.fieldname + "-" + uniqueSuffix + "." + extension;
    cb(null, filename);
  },
});
export const profileUpload = multer({ storage: profileStorage });

const productsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,__dirname + "/public/products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname
    const filename = file.fieldname + "-" + uniqueSuffix + "." + extension;
    cb(null, filename);
  },
});
export const productsUpload = multer({ storage: productsStorage });