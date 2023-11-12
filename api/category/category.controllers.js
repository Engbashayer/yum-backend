const Category = require("../../models/Category");

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  return res.status(200).json(categories);
};

exports.createOneCategory = async (req, res) => {
  const newCategory = await Category.create(req.body);
  console.log(newCategory);
  return res.status(201).json(newCategory);
};

exports.getOneCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "category does not exist" });
    }
    res.json(category);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the category." });
  }
};

exports.updateCategory = async (req, res) => {
  const categoryId = req.params.id; // Get the book ID from the request parameters
  const updatedCategory = req.body; // Get the updated book details from the request body
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updatedCategory,
      {
        new: true, // Return the updated book
      }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(updatedCategory); // Send the updated book as a JSON response
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the book." });
  }
};
