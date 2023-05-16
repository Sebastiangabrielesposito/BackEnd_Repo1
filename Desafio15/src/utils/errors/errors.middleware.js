export const errorMiddlewares = (error,req,res,next) =>{
    res.status(500).json({
        status:error.name,
        message:error.message,
        cause: error.cause
    })
}