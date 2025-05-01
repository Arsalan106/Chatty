const express=require("express");
const { logout, signup, signin,updateProfile,checkAuth } = require("../controllers/auth.controllers");
const {userAuth}=require("../middlewares/userAuth")
const router = express.Router();
router.post('/signup', signup) // localhost:5000/users/signup
router.post('/signin', signin)
router.post('/logout', logout)
router.put('/update-profile', userAuth, updateProfile);
router.get('/check',userAuth,checkAuth)
module.exports=router;