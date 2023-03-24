const mongoose = require("mongoose");

async function connectDb(uri) {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = { connectDb };
