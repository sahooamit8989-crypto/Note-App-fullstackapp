import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import noteRoutes from "./routes/note.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4002;

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- Database connection ---
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error connecting to MongoDB:", error));

// --- Routes ---
app.use("/api/v1/noteapp", noteRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running. Try /api/v1/noteapp");
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}`);
});

