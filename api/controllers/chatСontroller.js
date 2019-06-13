const Message = require("../models/message"),
  User = require("../models/userModel");

const getMessages = function(req, res) {
  Message.find({})
    .populate({
      path: "author",
      select: "name"
    })
    .then(messages => res.json(messages))
    .catch(err => res.send(err));
};

const sendMessage = function(req, res) {
  var message = new Message({
    body: req.body.message,
    author: req.user._id
  });
  message
    .save()
    .then(message => {
      global.io.emit("message", {
        body: req.body.message,
        author: req.user._id
      });
      return res.json(message);
    })
    .catch(err => res.send(err));
};

module.exports = {
  getMessages,
  sendMessage
};
