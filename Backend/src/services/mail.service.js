import nodemailer from "nodemailer";

const getRequiredMailCredentials = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("Email service is not configured. Set EMAIL_USER and EMAIL_PASS.");
  }

  return { user, pass };
};

const sendMail = async ({ to, subject, html, text }) => {
  try {
    const { user, pass } = getRequiredMailCredentials();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"SearchMind" <${user}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error;
  }
};

export default sendMail;