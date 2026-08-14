import jwt from "jsonwebtoken";
import sendMail from "../services/mail.service.js";
import userModel from "../models/user.model.js";
export async function register(req, res) {
  const { username, email, password } = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await userModel.create({ username, email, password });

  try {
    await sendMail({
      to: user.email,
      subject: "Welcome to SearchMind",
      html: `
    <h1>Welcome to SearchMind, ${user.username}!</h1>
    <p>Your account has been created successfully.</p>
  `,
    });
  } catch (error) {
    console.error("Welcome email skipped:", error.message);
  }

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
