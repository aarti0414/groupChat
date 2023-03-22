const express = require('express');

const chatRoutes=express.Router();

const chatController=require('../controllers/chat');

chatRoutes.post('/chat', chatController.chat);
chatRoutes.get('/', chatController.getChats);

module.exports=chatRoutes;
