import { connect } from "mongoose";

async function connectDb(uri: string) {
  try {
    await connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    throw err;
  }
}

export { connectDb };
