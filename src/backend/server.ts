import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";

dotenv.config();

const app = express();
// Enables the server to read JSON data
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Api is running..");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
