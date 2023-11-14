const mongoose = require("mongoose");

// username : string
// pw : string
// img : file
// email : string
// recipes : [{}]

const ChefSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  chefimage: {
    type: String,
    default:
      "https://img.freepik.com/premium-vector/smiling-chef-cartoon-character_8250-10.jpg",
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

module.exports = mongoose.model("chef", ChefSchema);
