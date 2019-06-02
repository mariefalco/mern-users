var router = require("express").Router();
var authHandlers = require("../controllers/authСontroller"),
  usersList = require("../controllers/usersController"),
  friendsList = require("../controllers/friendsController"),
  passport = require("passport"),
  loginRequired = passport.authenticate("jwt", { session: false });

// home
router.get("/", loginRequired, usersList.getMe); // view all users

// auth
router.post("/auth/register", authHandlers.register); // registration
router.post("/auth/sign_in", authHandlers.signIn); // sing in

// users
router.get("/users", loginRequired, usersList.getUsers); // view all users

// app
//     .route("/users/:userId")
//     .get(loginRequired, usersList.getUser) // view user
//     .put(loginRequired, usersList.updateUser) // update information about user
//     .delete(loginRequired, usersList.deleteUser) // delete the user

//     // friends
//     .patch(loginRequired, friendsList.addReq); // receive auth user id, who want to be friend

//   app.route("/friend_requests").get(loginRequired, friendsList.getReqs); // view friend requests
//   app
//     .route("/friend_requests&:reqId")
//     .patch(loginRequired, friendsList.addFriend) // accept friend request
//     .delete(loginRequired, friendsList.rejReq); // reject friend request

//   app.route("/friends").get(loginRequired, friendsList.getFriends); // view friends
//   app
//     .route("/friends&:friendId")
//     .delete(loginRequired, friendsList.deleteFriend); // delete the friend via id

module.exports = router;
