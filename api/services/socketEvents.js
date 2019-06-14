const Message = require("../models/message");

module.exports = function(io) {
  // Set socket.io listeners.
  io.on("connection", socket => {
    //console.log('a user connected');

    socket.on("new message", message => {
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
              io.emit("chat messages", messages);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });

    socket.on("disconnect", () => {
      //console.log('user disconnected');
    });
  });
};
