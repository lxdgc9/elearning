import mongoose, { Connection } from "mongoose";

async function connectDb(uri: string): Promise<Connection> {
  try {
    await mongoose.connect(uri, {});
    console.log("MongoDB connected");
    return mongoose.connection;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

export { connectDb };
