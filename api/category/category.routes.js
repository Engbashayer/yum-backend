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

// const categoryroutes = express.Router();

router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategory(categoryId, next);
  req.category = category;
  next();
});

router.get("/categories", getAllCategories);
router.post("/category", createOneCategory);
// categoryroutes.get("/category/:id", getOneCategory);
router.put("/category/:id", updateCategory);
// categoryroutes.delete("/category/:id", deleteCategory);

router.post("/:categoryId", addrecipeToCategory);
module.exports = router;
