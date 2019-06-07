var router = require("express").Router();
var authHandlers = require("../controllers/authСontroller"),
  usersList = require("../controllers/usersController"),
  friendsList = require("../controllers/friendsController"),
  passport = require("passport"),
  loginRequired = passport.authenticate("jwt", { session: false });

// home
router.get("/", loginRequired, usersList.getMe);

// auth
router.post("/auth/registration", authHandlers.registration);
router.post("/auth/sign_in", authHandlers.signIn);

// users
router.get("/users", loginRequired, usersList.getUsers);

router.get("/users/:userId", loginRequired, usersList.getUser);
router.put("/users/:userId", loginRequired, usersList.updateUser);
router.delete("/users/:userId", loginRequired, usersList.deleteUser);

// friends
router.patch("/users/:userId", loginRequired, friendsList.sendFriendRequest); // receive auth user id, who want to be friend

router.get("/friend_requests", loginRequired, friendsList.getMyFriendRequests);
router.patch("/friend_requests&:reqId", loginRequired, friendsList.addFriend); // accept friend request
router.delete(
  "/friend_requests&:reqId",
  loginRequired,
  friendsList.rejectFriendRequest
);

router.get("/friends", loginRequired, friendsList.getMyFriends);
router.delete("/friends&:friendId", loginRequired, friendsList.deleteFriend);

module.exports = router;
