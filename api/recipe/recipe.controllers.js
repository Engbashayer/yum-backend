const Recipe = require("../../models/Recipe");

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    return res.status(201).json(recipes);
  } catch (err) {
    next(err);
  }
};

exports.recipesCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path.replace("\\", "/");
    }
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

exports.recipesDelete = async (req, res, next) => {
  try {
    await req.recipe.deleteOne();
    res.status(204).end();
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

exports.addrecipetoingredients = async (req, res, next) => {
  try {
    await req.Recipe.updateOne({ $push: { ingredients: req.ingredients } });
    await req.ingredient.updateOne({ $push: { recipes: req.recipes } });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
