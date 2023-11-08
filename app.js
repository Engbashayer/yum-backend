const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./database");
const categoryrouter = require("./api/category/category.routes");

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("api/category", categoryrouter);

connectDB();
app.listen(8000, () => {
  console.log(`App is running on port:8000`);
});
