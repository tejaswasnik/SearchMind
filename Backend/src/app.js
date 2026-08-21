import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import morgen from "morgan";
import chatRouter from "../src/routes/chat.routes.js";
const app = express();
import "dotenv/config";
// --- Core Middleware ---
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgen("dev"));
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
  }),
);
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);
// --- Health Check ---
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// --- Routes ---
// Import and mount your route files here, e.g.:
// import userRoutes from "./routes/user.routes.js";
// app.use("/api/v1/users", userRoutes);

export default app;
