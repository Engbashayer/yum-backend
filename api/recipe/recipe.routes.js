const express = require("express");
const passport = require("passport");
const upload = require("../../middlewares/multer");

const router = express.Router();
const {
  getAllRecipes,
  recipesCreate,
  recipesDelete,
  recipesUpdate,
  fetchRecipe,
} = require("./recipes.controllers");

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipe(recipeId, next);
  req.recipe = recipe;
  next();
});

router.get("/", getAllRecipes);
router.post("/", upload.single("image"), recipesCreate);

router.delete("/:recipeId", recipesDelete);

router.put("/:recipeId", recipesUpdate);

module.exports = router;
