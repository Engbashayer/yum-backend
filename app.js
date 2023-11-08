const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./database");

app.get("/", (req, res) => {
  res.send("hello express");
});

connectDB();
app.listen(8000, () => {
  console.log(`App is running on port:8000`);
});
