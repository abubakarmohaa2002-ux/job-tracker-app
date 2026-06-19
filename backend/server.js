import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import jobRoutes from "./src/routes/jobRoutes.js";
import { connectDB } from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ✅ Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

// ✅ API Routes
app.use("/api/jobs", jobRoutes);

// ✅ Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend", "dist", "index.html")
    );
  });
}

// ✅ Start server AFTER DB connects
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server started on PORT: ${PORT}`);
  });
});