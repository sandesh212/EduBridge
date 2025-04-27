const chatModel = require("../models/chatModel");
const express = require("express");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    //Check of the both Id are there:
    const chat = await chatModel.findOne({
      member: { $all: [firstId, secondId] },
    });
    if (chat) return res.status(200).json(chat);

    //Create new Chat
    const newChat = await chatModel({
      members: [firstId, secondId],
    });
    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//get User Chat
const findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chat = await chatModel.find({
      members: { $all: [userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Find Chat
const findChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {createChat,findUserChats,findChat}