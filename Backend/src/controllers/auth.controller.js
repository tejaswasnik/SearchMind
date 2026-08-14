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
  const emailVerificationToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "3h" },
  );
  try {
    await sendMail({
      to: user.email,
      subject: "Welcome to SearchMind",
      html: `
    <h1>Welcome to SearchMind, ${user.username}!</h1>
    <p>Your account has been created successfully.</p>
    <p>Please verify your email by clicking the link below:</p>
    <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
    <p>This link will expire in 3 hours.</p>
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

export async function verifyEmail(req, res) {
  const { token } = req.query;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
  const user = await userModel.findById(decoded.userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  user.verified = true;
  await user.save();

  const html = `
    <h1>Email Verified Successfully</h1>
    <p>Thank you for verifying your email, ${user.username}!</p>
    <p>You can now log in to your account.</p>
    <a href="http://localhost:3000/login">Login</a>
  `;
  return res.status(200).json({
    success: true,
    message: "Email verified successfully",
    html,
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  if (!user.verified) {
    return res.status(400).json({
      success: false,
      message:
        "Email not verified. Please verify your email before logging in.",
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token);
  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
        id: user._id,
        username: user.username,
        email: user.email,
    }
  });
}

export async function getMe(req, res) {
  const userId = req.user.userId;
  const user = await userModel.findById(userId).select("-password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    user,
  });
}