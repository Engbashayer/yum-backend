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
} = require("./recipe.controllers");

reciperouter.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipe(recipeId, next);
  req.recipe = recipe;
  next();
});

reciperouter.get("/", getAllRecipes);
reciperouter.post(
  "/r",

  upload.single("image"),
  recipesCreate
);

reciperouter.delete("/:recipeId", recipesDelete);

reciperouter.put("/:recipeId", recipesUpdate);
reciperouter.post("/:recipeId", addingredientToRecipe);

module.exports = reciperouter;
