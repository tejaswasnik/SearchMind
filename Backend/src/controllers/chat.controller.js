import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;

  let title = null,
    chat = null;
  if (!chatId) {
    title = await generateChatTitle(message);
   
    chat = await chatModel.create({
      user: req.user.userId,
      title: title,
    });
  }

  const activeChatId = chatId || chat._id;

  const userMessage = await messageModel.create({
    chat: activeChatId,
    content: message,
    role: "user",
  });
  const messages = await messageModel
    .find({ chat: activeChatId })
    .sort({ createdAt: 1 });
  console.log(messages);
  const result = await generateResponse(messages);
  const aiMessage = await messageModel.create({
    chat: activeChatId,
    content: result,
    role: "ai",
  });
  res.status(201).json({
    title,
    chat,
    aiMessage,
  });
}
