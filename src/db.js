import mongoose from "mongoose";

async function connect(uri) {
  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.log("MongoDB connection error:", err);
      throw err;
    });
}

export { connect };
