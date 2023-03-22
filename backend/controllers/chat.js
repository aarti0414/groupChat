const User = require('../models/user');
const Chat = require('../models/chat');

exports.chat = (req, res) => {
  const { message, name, userId } = req.body;

  console.log('chat api called');
  Chat.create({ message, name, userId })
    .then(chat => {
      res.status(201).json({ success: true, message: 'message sent', chat });
    })
    .catch(err => {
      console.log(err);
      res.status(403).json({ success: false, message: 'something went wrong' });
    })
}

exports.getChats = (req, res) => {
  Chat.findAll()
    .then((chat) => {
      res.status(200).json({ chat: chat });
    }).catch(err => console.log(err));
}
