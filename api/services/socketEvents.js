const Message = require("../models/message");

module.exports = function(io) {
  io.on("connection", socket => {
    socket.on("NEW_MESSAGE", message => {
      var newMessage = new Message({
        body: message.body,
        author: message.authorId
      });
      newMessage
        .save()
        .then(() => {
          Message.find({})
            .populate({
              path: "author",
              select: "name"
            })
            .then(messages => {
              io.emit("CHAT_MESSAGES", messages);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    });
  });
};
