import mongoose from "mongoose";

let isConnected = false; // ✅ Track the connection status

const db = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      dbName: "blogapp",
    });

    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

export default db;
