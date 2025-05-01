const mongoose=require("mongoose");

const userSchema= new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        fullName:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            minLength:6,
            required:true
        },
        profilePic:{
            type:String,
            default:"",
        },
    },
    {timestamps:true}
    )
    const User=mongoose.model("User",userSchema);
    module.exports=User

    // 28:48 https://www.youtube.com/watch?v=ntKkVrQqBYY