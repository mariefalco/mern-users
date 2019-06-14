const mongoose = require("mongoose"),
  User = mongoose.model("User"),
  jwt = require("jsonwebtoken"),
  config = require("../config/config");

const refreshTokens = {};

const registration = (req, res) => {
  let newUser = User(req.body);
  newUser
    .save()
    .then(user => res.json(user))
    .catch(() =>
      res.status(402).send({ message: "This email already exists." })
    );
};

const signIn = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(402).send({ message: "The user does not exist." });
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(
            { id: user.id, name: user.name },
            config.jwtSecret,
            { expiresIn: config.tokenLife }
          );
          const refreshToken = jwt.sign(
            { id: user.id, name: user.name },
            config.refreshTokenSecret,
            { expiresIn: config.refreshTokenLife }
          );
          const response = {
            id: user.id,
            name: user.name,
            token: token,
            refreshToken: refreshToken
          };
          refreshTokens[refreshToken] = {
            name: user.name,
            date: Math.floor(Date.now() / 1000) + config.refreshTokenLife
          };
          return res.json(response);
        } else {
          return res.status(402).send({ message: "The password don't match." });
        }
      });
    })
    .catch(err => res.send(err));
};

const refreshToken = (req, res) => {
  const name = req.body.name;
  const refreshToken = req.body.refreshToken;
  if (
    refreshToken in refreshTokens &&
    refreshTokens[refreshToken].name === name &&
    Math.floor(Date.now() / 1000) - refreshTokens[refreshToken].date < 0
  ) {
    delete refreshTokens[refreshToken];
    const newToken = jwt.sign(
      { id: req.body.id, name: req.body.name },
      config.jwtSecret,
      { expiresIn: config.tokenLife }
    );
    const newRefreshToken = jwt.sign(
      { id: req.body.id, name: req.body.name },
      config.refreshTokenSecret,
      { expiresIn: config.refreshTokenLife }
    );
    const response = {
      id: req.body.id,
      name: req.body.name,
      token: newToken,
      refreshToken: newRefreshToken
    };
    refreshTokens[newRefreshToken] = {
      name: req.body.name,
      date: Math.floor(Date.now() / 1000) + config.refreshTokenLife
    };
    return res.json(response);
  } else {
    res.status(403).send({ message: "Please, log in." });
  }
};

const deleteToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
  }
  res.json(refreshTokens);
};

module.exports = {
  registration,
  signIn,
  refreshToken,
  deleteToken
};
