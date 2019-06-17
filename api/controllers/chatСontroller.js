const Message = require("../models/message");

const getMessages = function(req, res) {
  Message.find({})
    .populate({
      path: "author",
      select: "name"
    })
    .then(messages => res.json(messages))
    .catch(err => res.send(err));
};

module.exports = {
  getMessages
};
