const express = require("express");
const passport = require("passport");
const upload = require("../../middlewares/multer");

const router = express.Router();
const {
  getAllingredients,
  ingredientsUpdate,
  ingredientsDelete,
  ingredientsCreate,
  fetchIngredient,
} = require("./ingredients.controllers");

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const ingredient = await fetchIngredient(ingredientId, next);
  req.ingredient = ingredient;
  next();
});

router.get("/", getAllingredients);
router.post("/", upload.single("image"), ingredientsCreate);

router.delete("/:ingredientId", ingredientsDelete);

router.put("/:ingredientId", ingredientsUpdate);

module.exports = router;
