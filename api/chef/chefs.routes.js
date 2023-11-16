const express = require("express");
const passport = require("passport");

const chefrouter = express.Router();

const {
  signup,
  signin,
  getChefs,
  recipeCreate,
} = require("./chefs.controllers");
const upload = require("../../middlewares/multer");

chefrouter.post("/signup", upload.single("image"), signup);

chefrouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
chefrouter.get("/chefs", getChefs);

chefrouter.post("/:chefId", recipeCreate);

module.exports = chefrouter;
