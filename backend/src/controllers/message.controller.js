const User = require("../models/user.model")
const { mongoose } = require("mongoose");
const Message = require("../models/message.model");
const getUser = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.json({ filteredUser });
    } catch (error) {
        console.log("error in getting allusers", error.message)
        res.json({ message: "Internal server error" });
    }
}
const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        //myId=id of current loggedin user which has been stored during authentication in req
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { receiverId: userToChatId, senderId: myId }
            ]
        })
        res.json({ messages });
    } catch (error) {
        console.log("error in getmessage controller", error.message);
        res.json({ message: "internal server error" });
    }
}
const sendMesage = async (req, res) => {
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newmessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });
        await newmessage.save();
        res.json({newmessage});
        //todo :realtime functionalty goes here socket.io
    } catch (error) {
        console.log("error in sendmessage controller", error.message);
        res.json({ message: "internal server error" });
    }
}

module.exports = { getUser, getMessage, sendMesage };