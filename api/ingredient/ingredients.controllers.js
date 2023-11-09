const Recipe = require("../../models/Recipe");

exports.getAllingredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(201).json(ingredients);
  } catch (err) {
    next(err);
  }
};

exports.ingredientsCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path.replace("\\", "/");
    }
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};

exports.ingredientsDelete = async (req, res, next) => {
  try {
    await req.ingredient.deleteOne();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.ingredientsUpdate = async (req, res, next) => {
  try {
    await req.ingredient.updateOne(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const ingredient = await Ingredient.findById(ingredientId);
    if (ingredient) {
      return ingredient;
    } else {
      next({ message: "ingredient not found", status: 404 });
    }
  } catch (error) {
    next(error);
  }
};
