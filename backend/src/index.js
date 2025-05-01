require("dotenv").config();
const cors=require("cors");
const express = require("express");
const authroutes=require("./routes/auth.route")
const messageroutes=require("./routes/message.route")
const cookieParser = require("cookie-parser");
const {connectDB} = require("./lib/db")
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
})
);
app.use(express.json());
app.use(cookieParser()); 
app.use('/users',authroutes);   
app.use('/message',messageroutes)  //message/get-users
//users/login
//message/get-users
//message/
app.listen(PORT, () => {
    console.log("Running on PORT: " + PORT);
    connectDB();
});