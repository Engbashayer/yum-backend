const express = require("express");
const passport = require("passport");
const upload = require("../../middlewares/multer");

const ingredientRoutes = express.Router();
const {
  getAllingredients,
  ingredientsUpdate,
  ingredientsDelete,
  ingredientsCreate,
  fetchIngredient,
} = require("./ingredients.controllers");

ingredientRoutes.param("ingredientId", async (req, res, next, ingredientId) => {
  const ingredient = await fetchIngredient(ingredientId, next);
  req.ingredient = ingredient;
  next();
});

ingredientRoutes.get("/", getAllingredients);

ingredientRoutes.post(
  "/ing",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),

  ingredientsCreate
);

ingredientRoutes.delete("/:ingredientId", ingredientsDelete);

ingredientRoutes.put("/:ingredientId", ingredientsUpdate);

module.exports = ingredientRoutes;
