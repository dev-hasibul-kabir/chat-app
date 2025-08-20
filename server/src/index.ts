import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db";
import authRoutes from "./routes/auth.route";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
