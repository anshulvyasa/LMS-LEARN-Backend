//THis Middle is Required to check if a particular user is Authenciate or not for some routes 

const jwt=require('jsonwebtoken')

const verifyToken=(token,secret)=>{
    return jwt.verify(token,secret)
}

const authenticate=(req,res,next)=>{
    const authHeader=req.headers.authorization;
   

     if(!authHeader){
        return res.status(401).json({
            success:false,
            message:"user is not authenticated"
        })
     }

     
     const token =authHeader.split(' ')[1]      //because in front end we do some which will require this split step
     
     //see frontEnd code to understand it client/api/axiosInstance 
     const payload=verifyToken(token,"JWT_SECRET")

     req.user=payload
     next();
};


module.exports=authenticate