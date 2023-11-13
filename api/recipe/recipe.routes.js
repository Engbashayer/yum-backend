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
  addrecipetoingredients,
} = require("./recipe.controllers");

reciperouter.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipe(recipeId, next);
  req.recipe = recipe;
  next();
});

reciperouter.get("/recipes", getAllRecipes);

reciperouter.post("/r", upload.single("image"), recipesCreate);

reciperouter.delete("/:recipeId", recipesDelete);

reciperouter.put("/:recipeId", recipesUpdate);
reciperouter.put("/:recipeId/:ingredientId", addrecipetoingredients);

module.exports = reciperouter;
