export const errorMiddlewares = (error,req,res,next) =>{
    res.send({
        status:error.name,
        message:error.message,
        cause: error.cause
    })
}