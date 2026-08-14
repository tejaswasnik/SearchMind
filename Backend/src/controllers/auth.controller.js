import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
export async function register(req, res) {
  const { username, email, password } = req.body;
  const isUserAlreadyExists = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await userModel.create({ username, email, password });
}
