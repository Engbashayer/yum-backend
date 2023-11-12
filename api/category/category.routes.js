const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createOneCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
  fetchCategory,

  addrecipeToCategory,
} = require("./category.controllers");
const categoryroutes = express.Router();

router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategory(categoryId, next);
  req.category = category;
  next();
});

categoryroutes.get("/categories", getAllCategories);
categoryroutes.post("/category", createOneCategory);
// categoryroutes.get("/category/:id", getOneCategory);
categoryroutes.put("/category/:id", updateCategory);
// categoryroutes.delete("/category/:id", deleteCategory);

router.post("/:categoryId", addrecipeToCategory);
module.exports = categoryroutes;
