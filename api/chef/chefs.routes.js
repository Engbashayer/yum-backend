const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  signup,
  signin,
  getChefs,
  recipeCreate,
} = require("./chefs.controllers");
const upload = require("../../middlewares/multer");

router.post("/signup", upload.single("image"), signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.get("/chefs", getChefs);

router.post("/:chefId", recipeCreate);

module.exports = router;
