import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
// Enables the server to read JSON data
app.use(express.json());
app.use(cors());

connectDB();

// Set routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Api is running..");
});
