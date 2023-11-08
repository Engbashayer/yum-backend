const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./database");

app.get("/", (req, res) => {
  res.send("hello express");
});

connectDB();
app.listen(8000, () => {
  console.log(`App is running on port:8000`);
});
