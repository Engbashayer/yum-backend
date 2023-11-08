const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./database");
const chefRoutes = require("./api/chef/chefs.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const passport = require("passport");
const { localStrategy, jWTStrategy } = require("./middlewares/passport");

connectDB();

app.use(express.json());
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jWTStrategy);
app.use("/api", chefRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8000, () => {
  console.log(`App is running on port:8000`);
});
