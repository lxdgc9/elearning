const mongoose = require("mongoose");

async function connect(uri) {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = { connect };
