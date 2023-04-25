export async function registro(req,res){
    try{
        res.render("registro", { titulo: "registro" });
    }catch(error){
        res.status(500).json({error})
    }
}
export async function errorRegistro(req,res){
    try{
        res.render("errorRegistro", { titulo: "errorRegistro" });
    }catch(error){
        res.status(500).json({error})
    }
}
export async function login(req,res){
    try{
        res.render("login", { titulo: "login" });
    }catch(error){
        res.status(500).json({error})
    }
}
export async function errorLogin(req,res){
    try{
        res.render("errorLogin", { titulo: "errorLogin" });
    }catch(error){
        res.status(500).json({error})
    }
}
export async function addProducts(req,res){
    try{
        res.render("addProducts", { titulo: "addProducts" });
    }catch(error){
        res.status(500).json({error})
    }
}
export async function changePassword(req,res){
    try{
        res.render("changePassword", { titulo: "changePassword" });
    }catch(error){
        res.status(500).json({error})
    }
}
export async function jwt(req,res){
    try{
        res.render("jwtFront", { titulo: "jwt" });
    }catch(error){
        res.status(500).json({error})
    }
}