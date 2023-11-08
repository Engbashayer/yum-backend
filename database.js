// Import the Mongoose library
const mongoose = require("mongoose");
// Import the dotenv library for managing environment variables
require("dotenv").config();

// Define a function to connect to the MongoDB database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to the Database");
  } catch (error) {
    console.error("Error trying to connect to the database:", error);
  }
};

// Export the connectDB function for use in your app
module.exports = connectDB;
