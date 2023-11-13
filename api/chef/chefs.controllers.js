const Chef = require("../../models/chef");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const hashPassWord = async (pw) => {
  const hashedPassword = await bcrypt.hash(pw, 10);
  return hashedPassword;
};

const generateToken = (chef) => {
  const payload = {
    _id: chef._id,
    username: chef.username,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5hr" });
};

exports.signup = async (req, res, next) => {
  try {
    const hassMyPw = await hashPassWord(req.body.password);
    req.body.password = hassMyPw;
    const newChef = await Chef.create(req.body);

    const token = generateToken(newChef);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    console.log(req.user);
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
    next(err);
  }
};

exports.getChefs = async (req, res, next) => {
  try {
    const chefs = await Chef.find().populate("recipes");
    res.status(201).json(chefs);
  } catch (err) {
    next(err);
  }
};

exports.recipeCreate = async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    await req.Chef.updateOne({ $push: { recipes: newRecipe } });
    res.status(201).json(req.chef);
  } catch (error) {
    next(error);
  }
};
