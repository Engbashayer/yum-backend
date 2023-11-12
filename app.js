const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./database");
const chefRoutes = require("./api/chef/chefs.routes");
const ingredientRoutes = require("./api/ingredient/ingredients.routes");
const categoryrouter = require("./api/category/category.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const passport = require("passport");
const { localStrategy, jWTStrategy } = require("./middlewares/passport");
const router = require("./api/recipe/recipe.routes");

app.use("/api", categoryrouter);

connectDB();
app.use("/media", express.static(path.join(__dirname, "media")));

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jWTStrategy);
app.use("/api", chefRoutes);
app.use("/api", ingredientRoutes);
app.use("api/category", categoryrouter);
app.use("api", router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8000, () => {
  console.log(`App is running on port:8000`);
});
