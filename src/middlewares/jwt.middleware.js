import jwt from "jsonwebtoken"

const jwtAuth = async(req,res,next)=>{
    const token = req.headers["authorization"]
    if(!token){
        res.status(400).send("login first")
    } else {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = payload
        next()
    }
}

export default jwtAuth