import dotenv, { config } from 'dotenv'

dotenv.config()

const obj = {
     PORT : process.env.PORT,
    URL_MONGO: process.env.URL_MONGO,
    SECRET_KEY: process.env.SECRET_KEY,
    ADMIN_KEY: process.env.ADMIN_KEY,
    PERSISTENCIA:process.env.PERSISTENCIA,
    node_env : process.env.NODE_ENV,
    gmail_user:process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD,
    token_nodemailer: process.env.TOKENNODEMAILER,
}
// console.log(process.env);
export default obj;