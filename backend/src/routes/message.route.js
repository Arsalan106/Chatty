const express=require("express");
const { userAuth } = require("../middlewares/userAuth");
const {getUser,getMessage,sendMesage}=require("../controllers/message.controller")
const router=express.Router();
router.get('/get-users',userAuth,getUser); // localhost:5000/message/get-users
router.get('/:id',userAuth,getMessage); // localhost:5000/message/id
router.post("/send/:id",userAuth,sendMesage);  // localhost:5000/message/send/id
module.exports=router;