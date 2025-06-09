import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
app.use(express.json());
app.use(cors());

const router = express.Router();

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST route to send an email
router.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Developer's Email
    subject: `New Contact Message from ${name}`,
    text: `Sender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

export default router;
