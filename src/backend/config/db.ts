import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.VITE_MONGODB || "");
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
  }
};

export default connectDB;
