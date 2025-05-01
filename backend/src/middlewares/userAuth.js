const jwt=require("jsonwebtoken");
const User=require("../models/user.model");

const userAuth=async(req,res,next)=>{
    try{                                                
        const token=req.cookies.jwt;
        console.log("Received Cookies:",token);
        if(!token){
            return res.json({message:"unautharised user:no token"});
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(404).json({message:"unauthorised:invalid user"});
        }
        const user=await User.findById(decode.userId).select("-password");
        if(!user){
            return res.json({message:"user not found"});
        }
        req.user=user;
        next();
    }
    catch(error){
        console.log("error in userauth",error.message);
        res.status(500).json({message:"internal server error"});
    }
}
module.exports={userAuth}