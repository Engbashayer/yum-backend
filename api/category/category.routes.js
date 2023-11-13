const express = require("express");
const categoryrouter = express.Router();
const {
  getAllCategories,
  createOneCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
  fetchCategory,

  addrecipeToCategory,
} = require("./category.controllers");

// const categoryroutes = express.Router();

categoryrouter.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategory(categoryId, next);
  req.category = category;
  next();
});

categoryrouter.get("/", getAllCategories);
categoryrouter.post("/c", createOneCategory);
// categoryroutes.get("/category/:id", getOneCategory);
categoryrouter.put("/:categoryId", updateCategory);
// categoryroutes.delete("/category/:id", deleteCategory);

/// not tested
categoryrouter.post(
  "/:categoryId",

  addrecipeToCategory
);
module.exports = categoryrouter;
