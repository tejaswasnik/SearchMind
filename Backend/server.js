import dotenv from "dotenv";
dotenv.config();
import { testAI } from "./src/services/ai.service.js";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

const PORT = process.env.PORT || 5000;
testAI();
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB, server not started.", err);
    process.exit(1);
  });
