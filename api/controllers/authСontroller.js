const mongoose = require("mongoose"),
  User = mongoose.model("User"),
  jwt = require("jsonwebtoken"),
  config = require("../config/config");

function createToken(user) {
  return jwt.sign({ id: user.id, name: user.name }, config.jwtSecret, {
    expiresIn: 31556926 // 1 year in seconds
  });
}

const register = (req, res) => {
  let newUser = User(req.body);
  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

const signIn = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: "The user does not exist." });
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          return res.json({
            token: createToken(user)
          });
        } else {
          return res.status(401).send({ message: "The password don't match." });
        }
      });
    })
    .catch(err => res.send(err));
};

module.exports = {
  register,
  signIn
};
