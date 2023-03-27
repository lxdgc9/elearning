import mongoose from "mongoose";

async function connectDb(uri) {
  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.log("MongoDB connection error:", err);
      throw err;
    });
}

export { connectDb };
