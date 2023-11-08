const Chef = require("../models/chef");
const bcrypt = require("bcrypt");

const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;

const localStrategy = new LocalStrategy(
  { usernameField: "username" },
  async (username, password, done) => {
    try {
      const chef = await Chef.findOne({ username: username });
      if (!chef) return done({ message: "username or  password is wrong" });
      const checkpw = await bcrypt.compare(password, chef.password);
      if (!checkpw) return done({ message: "username or  password is wrong" });
      return done(null, chef);
    } catch (error) {
      done(error);
    }
  }
);

const jWTStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      if (Date.now() / 1000 > payload.exp) return done(null, false);
      const chef = await Chef.findById(payload._id);
      if (!chef) return done(null, false);
      return done(null, chef);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = { localStrategy, jWTStrategy };
