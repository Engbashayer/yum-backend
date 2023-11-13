const Category = require("../../models/Category");
const Recipe = require("../../models/Recipe");

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  return res.status(200).json(categories);
};

exports.createOneCategory = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.image = req.file.path.replace("\\", "/");
    // }
    console.log(req.body);
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

// exports.getOneCategory = async (req, res) => {
//   const categoryId = req.params.id;
//   try {
//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return res.status(404).json({ error: "category does not exist" });
//     }
//     res.json(category);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the category." });
//   }
// };

exports.fetchCategory = async (categoryId, next) => {
  try {
    const category = await Category.findById(categoryId);
    if (category) {
      return category;
    } else {
      next({ message: "Category not found", status: 404 });
    }
  } catch (error) {
    next(error);
  }
};
exports.updateCategory = async (req, res, next) => {
  // const categoryId = req.params.id; // Get the book ID from the request parameters

  // const updatedCategory = req.body; // Get the updated book details from the request body
  try {
    const updatedCategory = await req.category.updateOne(req.body, {
      new: true,
    });

    return res.json(updatedCategory); // Send the updated book as a JSON response
  } catch (error) {
    return next(error);
  }
};

exports.addrecipeToCategory = async (req, res, next) => {
  try {
    const foundRecipe = await Recipe.findById(req.body.recipeId);

    const newcate = await req.category.updateOne({
      $push: { reciepes: foundRecipe },
    });
    await foundRecipe.updateOne({ $push: { category: req.category } });
    // await req.Recipe.updateOne({ $push: { category: req.category } });
    return res.status(204).json(newcate);
  } catch (error) {
    next(error);
  }
};
