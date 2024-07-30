const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.SECRET_KEY
const generateToken = async({_id})=>{
    try {
        const payload = {_id};
        const token = await jwt.sign(payload,secretKey,{expiresIn:'10d'})
        return {token}
    } catch (error) {
        console.log(error)
    }
}

module.exports=generateToken