import dotenv from "dotenv";
dotenv.config();
import http from "http";

import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { initSocket } from "./src/sockets/server.socket.js";
const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app);
initSocket(httpServer);
connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB, server not started.", err);
    process.exit(1);
  });
