import winston from "winston";
import config from "../../config.js"


const logsLevels ={
    names:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5

    },
    colors:{
       fatal :"black",
       error:"red",
       warning:"yellow",
       info:"green",
       http:"blue",
       debug:"cyan"
    }
}
let logger

if(config.node_env === "development"){
    logger = winston.createLogger({
        levels: logsLevels.names,
        transports:[
            new winston.transports.Console({
                level:"debug",
                format:winston.format.combine(
                    winston.format.colorize({colors:logsLevels.colors}),
                    winston.format.simple()
                )
            })
        ]
    })
}else{
    logger = winston.createLogger({
        levels: logsLevels.names,
        transports:[
            new winston.transports.File({
                level:"info",
                filename:"./errors.log",
                format:winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint(),
                    winston.format.label({label:" este es un log de stage"}),
                    winston.format.colorize({colors:logsLevels.colors}),
                )
            })
        ]
    })
}

export default logger;
