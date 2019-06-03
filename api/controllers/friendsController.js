const mongoose = require("mongoose"),
  User = mongoose.model("User");

const sendFriendRequest = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { friend_requests: req.user._id } },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const getMyFriendRequests = function(req, res) {
  User.findById(req.user._id)
    .select("friend_requests -_id")
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const addFriend = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { friends: req.params.reqId } },
    { new: true }
  )
    .then(() =>
      User.findOneAndUpdate(
        { _id: req.params.reqId },
        { $push: { friends: req.user._id } },
        { new: true }
      )
    )
    .then(
      () => rejectFriendRequest(req, res) // does it work?
    )
    .then(() => res.json({ message: "The friend successfully added." }))
    .catch(err => res.send(err));
};

const rejectFriendRequest = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { friend_requests: req.params.reqId } },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const getMyFriends = function(req, res) {
  User.findById(req.user._id)
    .populate("friends")
    .then(friends => res.json(friends))
    .catch(err => res.send(err));
};

const deleteFriend = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .then(() =>
      User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.user._id } },
        { new: true }
      )
    )
    .then(() => res.json({ message: "The friend successfully deleted." }))
    .catch(err => res.send(err));
};

module.exports = {
  sendFriendRequest,
  getMyFriendRequests,
  addFriend,
  rejectFriendRequest,
  getMyFriends,
  deleteFriend
};
