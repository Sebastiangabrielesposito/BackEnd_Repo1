export default class CustomError{
    static createCustomError({name,message,cause}){
        const newError = new Error(message)
        newError.name = name
        newError.cause = cause
        throw newError
    }
}