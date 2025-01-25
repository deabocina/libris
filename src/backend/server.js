import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
// Enables the server to read JSON data
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Api is running..");
});
