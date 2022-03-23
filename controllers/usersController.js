const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const cleanUser = (user) => {
  const { salt, hash, __v, createdAt, updatedAt, ...cleanUser } = user._doc;
  return cleanUser;
};

const jwtopts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  ignoreExpiration: false,
  jsonWebTokenOptions: {
    maxAge: 3600
  }
};

module.exports = {
  create: async (req, res) => {
    try {
      const { password, ...rest } = req.body; // get the text contents
      let newUser = new User(rest);
      await User.register(newUser, password, (err, user) => {
        if (err) {
          console.log(
            `Failed to create and retrieve user account because: ${err.message}`
          );
          res.status(500).json({
            status: false,
            message: err.message
          });
        }

        res.status(201).json({
          status: true,
          message: "Created successfully",
          data: cleanUser(user)
        });
      });
    } catch (err) {
      console.log(`Failed to create user account because: ${err.message}`);
      res.status(500).json({
        status: false,
        message: err.message
      });
    }
  },

  login: (req, res) => {
    try {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          res.status(500).json({
            status: false,
            message: err.message
          });
        }
        if (!user) {
          res.status(404).json({
            status: false,
            message: "User not found"
          });
        }
        jwt.sign(
          {
            data: user._id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60
          },
          JWT_SECRET,
          (err, token) => {
            if (err) {
              res.status(500).json({
                status: false,
                message: err.message
              });
            }

            res.locals.data = cleanUser(user);
            res.locals.data["token"] = token;

            res.status(200).json({
              status: true,
              data: res.locals.data
            })
          }
        );
      })(req, res);
    } catch (err) {
      console.log(`Failed to log in user because: ${err.message}`);
      res.status(500).json({
        status: false,
        message: err.message
      });
    }
  },

  passjwt: new JwtStrategy(jwtopts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }),
};