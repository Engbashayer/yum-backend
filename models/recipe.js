const mongoose = require("mongoose");

// name : string
// username : [{}]
// img : file
// ingredients : [{}]
// category : {}
// instrctions : string

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
  },
  recipeimage: {
    type: String,
    default:
      "https://www.simplyrecipes.com/thmb/KRw_r32s4gQeOX-d07NWY1OlOFk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg",
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
  },
  instructions: { type: string, required: true },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
