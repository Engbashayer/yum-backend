const express = require("express");
const {
  getAllCategories,
  createOneCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("./category.controllers");
const categoryroutes = express.Router();

categoryroutes.get("/categories", getAllCategories);
categoryroutes.post("/category", createOneCategory);
categoryroutes.get("/category/:id", getOneCategory);
categoryroutes.put("/category/:id", updateCategory);
// categoryroutes.delete("/category/:id", deleteCategory);
module.exports = categoryroutes;
