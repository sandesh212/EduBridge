var jwt = require('jsonwebtoken');
const fetchUser = (req,res,next)=>{

    //Get the User from JWT Token & add ID to req Object 
    const token  = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please Authenticate using a Valid Token"})
    }
    try {
        const data = jwt.verify(token, process.env.JWTPRIVATEKEY)
         const user = data.user; // Retrieve the entire user object from data.user
        req.user = user;
        next();    
    } catch (error) {
        res.status(401).send({error:"Please Authenticate using a Valid Token"})
    }
    
}



module.exports = fetchUser;

