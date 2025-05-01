const jwt=require("jsonwebtoken");
const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
    console.log("token after signup", token);
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:false
    })
    return token;
}
module.exports={generateToken};