const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const CategorySchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  image: {
    type: String,
    required: false,
    default:
      "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/health/wp-content/uploads/2022/01/foods_to_eat_to_lose_weight.jpeg",
  },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

module.exports = model("Category", CategorySchema);
