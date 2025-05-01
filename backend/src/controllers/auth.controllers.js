const {mongoose } = require("mongoose");
const { generateToken } = require("../lib/utils");
const User=require("../models/user.model")
const bcrypt=require("bcryptjs");
const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
      if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
  
      const user = await User.findOne({ email });
  
      if (user) return res.status(400).json({ message: "Email already exists" });
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });
  
      if (newUser) {
        // generate jwt token here
        generateToken(newUser._id, res);
        await newUser.save();
  
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      console.log("Error in signup controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
const signin=async (req,res)=>{
    const {email,password}=req.body;
    try{
        if(password.length<6){
            return res.status(404).json({message:"password should be atleast 6 characters"})
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User doest not exist"});
        }
        //compare the passwprd the password of the user
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid username/password"});
        }
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })
    }
    catch(error){
        console.log("error in signin controller",error.message);
        res.json({message:"internal server error"});
    }

//     res.send("signin");
}

const logout=async (req,res)=>{
   try{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"logged out succussfully"});
    }
    catch(error){
        console.log("error in logging out",error.message);
        res.status(500).json("Internal server error");
    }
}
const updateProfile=async(req,res)=>{
    try{
        const {profilePic}=req.body;
        //after authentication user is added in the req
        const userId=req.user._id;
        if(!profilePic){
            return res.json({message:"profile pic is required"});
        }
        const uplaodRes=await cloudinary.uploader.upload(profilePic);
        const updateduser=await User.findByIdAndUpdate(userId,
            {profilePic:uplaodRes.secure_url},
            {new:true});
        res.status(200).json(updateduser);
    }
    catch(error){
        console.log("error in updateing the profile pic",error.message);
        res.json({message:"Internal server error"});
    }
}
const checkAuth=(req,res)=>{
    try{
        res.json(req.user);
    } catch(error){
        console.log('error in check auth');
        res.json({message:"internal server error"});
    }
}
module.exports={signin,signup,logout,updateProfile,checkAuth}
