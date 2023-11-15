const express = require("express");
const passport = require("passport");
const upload = require("../../middlewares/multer");

const reciperouter = express.Router();
const {
  getAllRecipes,
  recipesCreate,
  recipesDelete,
  recipesUpdate,
  fetchRecipe,

  addingredientToRecipe,
  getMyRecipes,
} = require("./recipe.controllers");

reciperouter.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipe(recipeId, next);
  req.recipe = recipe;
  next();
});

reciperouter.get("/", getAllRecipes);
reciperouter.get(
  "/my-recipes",
  passport.authenticate("jwt", { session: false }),
  getMyRecipes
);
reciperouter.post(
  "/r",
  passport.authenticate("jwt", { session: false }),
  upload.single("recipeimage"),
  recipesCreate
);

reciperouter.delete("/:recipeId", recipesDelete);

reciperouter.put("/:recipeId", recipesUpdate);
reciperouter.post("/:recipeId", addingredientToRecipe);

module.exports = reciperouter;
