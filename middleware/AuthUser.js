const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

const secretKey = process.env.SECRET_KEY

const authToken = async(req,res,next)=>{
    const token  = req.headers['authorization'];

    if(!token){
        return res.status(404).json({message:"No token provided"})
    }

    jwt.verify(token,secretKey,(err,decoded)=>{
        if(err){
            return res.status(500).json({
                message:"Faild to verify Token"
            })
        }
        req.user = decoded;
        next();
    })
}

module.exports = authToken;