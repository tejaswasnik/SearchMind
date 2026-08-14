import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
const app = express();

// --- Core Middleware ---
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
);
app.use("/api/auth", authRouter);
// --- Health Check ---
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// --- Routes ---
// Import and mount your route files here, e.g.:
// import userRoutes from "./routes/user.routes.js";
// app.use("/api/v1/users", userRoutes);

export default app;
