import logger from "../utils/winston/winston.js";

export const generateLog = (req,res,next)=>{
    logger.http(`Method: ${req.method} - URL: ${req.url} - Date:${new Date().toLocaleString()}`)
    next()
}