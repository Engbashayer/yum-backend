const Category = require("../../models/Category");
const Recipe = require("../../models/Recipe");
const chef = require("../../models/chef");
const ingredient = require("../../models/ingredient");
const ingredientRoutes = require("../ingredient/ingredients.routes");

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user");
    return res.status(201).json(recipes);
  } catch (err) {
    next(err);
  }
};

///// USE THIS ONE
exports.recipesCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path.replace("\\", "/");
    }
    const newRecipe = await Recipe.create(req.body);
    await Category.findByIdAndUpdate(req.body.category, {
      $push: { recipes: newRecipe._id },
    });

    await chef.findByIdAndUpdate(req.user._id, {
      $push: { recipes: newRecipe._id },
    });

    newRecipe.ingredients.forEach(async (ingredientId) => {
      await ingredient.findByIdAndUpdate(ingredientId, {
        $push: { recipes: newRecipe._id },
      });
    });

    return res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

exports.recipesDelete = async (req, res, next) => {
  try {
    await req.Recipe.deleteOne();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.recipesUpdate = async (req, res, next) => {
  try {
    await req.recipe.updateOne(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.fetchRecipe = async (recipeId, next) => {
  try {
    const recipe = await Recipe.findById(recipeId);
    if (recipe) {
      return recipe;
    } else {
      next({ message: "Recipe not found", status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

//addrecipetoingredients
////// DO NOT USE
exports.addingredientToRecipe = async (req, res, next) => {
  try {
    const foundIngredient = await ingredient.findById(req.body.ingredientId);
    console.log(foundIngredient);
    const newrec = await req.Recipe.updateOne({
      $push: { ingredients: foundIngredient._id },
    });
    // console.log(newrec);
    await foundIngredient.updateOne({ $push: { recipes: req.recipes } });

    return res.status(204).json(newrec);
  } catch (error) {
    next(error);
  }
};
