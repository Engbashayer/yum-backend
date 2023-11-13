const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  Ingredientimage: {
    type: String,
    default:
      "https://www.foodingredientfacts.org/wp-content/uploads/2019/04/AdobeStock_283156247-a-how-to-guide-to-the-ingredient-list-1-e1579114065189.jpeg",
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipe",
    },
  ],
});

module.exports = mongoose.model("ingredient", IngredientSchema);
