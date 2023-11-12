const mangoose = require("mangoose");

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Ingredientimage: {
    type: String,
    default:
      "https://www.foodingredientfacts.org/wp-content/uploads/2019/04/AdobeStock_283156247-a-how-to-guide-to-the-ingredient-list-1-e1579114065189.jpeg",
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

module.exports = mongoose.model("Ingredient", ChefSchema);