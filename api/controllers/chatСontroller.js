module.exports = function(io) {
  var that = {};
  const _io = io;

  const Message = require("../models/message"),
    User = require("../models/userModel");

  that.getMessages = function(req, res) {
    Message.find({})
      .populate({
        path: "author",
        select: "name"
      })
      .then(messages => res.json(messages))
      .catch(err => res.send(err));
  };

  that.sendMessage = function(req, res) {
    var message = new Message({
      body: req.body.message,
      author: req.user._id
    });
    message
      .save()
      .then(message => {
        _io.emit("message", {
          body: req.body.message,
          author: req.user._id
        });
        return res.json(message);
      })
      .catch(err => res.send(err));
  };

  return that;
};
