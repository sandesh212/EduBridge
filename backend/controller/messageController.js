const messageModel = require("../models/messagModel");

//Create Message Controller
const createMessage = async(req,res)=>{

    try {
        const {chatId, senderId, text} = req.body;

        const newMessage = await messageModel({
            chatId,
            senderId,
            text
        })
        const response = await newMessage.save();
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//Get Message Controller
const getMessage = async(req,res)=>{
    const {chatId} = req.params;
    try {
        const message = await messageModel.find({chatId});
        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = {createMessage,getMessage};