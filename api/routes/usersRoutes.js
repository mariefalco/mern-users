var router = require("express").Router();
var authHandlers = require("../controllers/authСontroller"),
  usersList = require("../controllers/usersController"),
  friendsList = require("../controllers/friendsController"),
  passport = require("passport"),
  loginRequired = passport.authenticate("jwt", { session: false });

// home
router.get("/", loginRequired, usersList.getMe); // home page

// auth
router.post("/auth/register", authHandlers.register); // registration
router.post("/auth/sign_in", authHandlers.signIn); // sing in

// users
router.get("/users", loginRequired, usersList.getUsers); // view all users

router.get("/users/:userId", loginRequired, usersList.getUser); // view user
router.put("/users/:userId", loginRequired, usersList.updateUser); // update information about user
router.delete("/users/:userId", loginRequired, usersList.deleteUser); // delete the user

// friends
router.patch("/users/:userId", loginRequired, friendsList.addReq); // receive auth user id, who want to be friend

router.get("/friend_requests", loginRequired, friendsList.getReqs); // view friend requests
router.patch("/friend_requests&:reqId", loginRequired, friendsList.addFriend); // accept friend request
router.delete("/friend_requests&:reqId", loginRequired, friendsList.rejReq); // reject friend request

router.get("/friends", loginRequired, friendsList.getFriends); // view friends
router.delete("/friends&:friendId", loginRequired, friendsList.deleteFriend); // delete the friend via id

module.exports = router;
