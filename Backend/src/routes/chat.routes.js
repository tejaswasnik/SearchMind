import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  sendMessage,
  getChats,
} from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.post("/message", authUser, sendMessage);
chatRouter.get("/", authUser, getChats);
chatRouter.get("/:chatId/messages", authUser, getMessages);
export default chatRouter;
