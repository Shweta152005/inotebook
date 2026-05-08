const jwt = require('jsonwebtoken');
const JWT_SECRET = 'harriisagoodbo';

// Middleware function to authenticate user using JWT token
const fetchuser= (req,res,next) =>{
//get the user from jwt token and add id to req obj
const token =req.header('auth-token');
 // Check if token exists
if(!token){
    res.status(401).send({error:"Please authenticate using a valid token"})
}
try{
     // Verify token using secret key
    const data=jwt.verify(token,JWT_SECRET);
     // Add user data to request object
req.user=data.user;
 // Move to next middleware/function
next();

}catch(error){
      // Send error if token is invalid
res.status(401).send({error:"Please authenticate using a valid token"})
}


}
module.exports=fetchuser;