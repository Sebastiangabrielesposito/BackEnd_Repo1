import dotenv, { config } from 'dotenv'

dotenv.config()

const obj = {
     PORT : process.env.PORT,
    URL_MONGO: process.env.URL_MONGO,
    SECRET_KEY: process.env.SECRET_KEY,
    ADMIN_KEY: process.env.ADMIN_KEY,
    PERSISTENCIA:process.env.PERSISTENCIA
}
// console.log(process.env);
export default obj;