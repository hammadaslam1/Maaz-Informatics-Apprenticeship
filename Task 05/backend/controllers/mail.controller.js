import nodemailer from "nodemailer";
import http from "http";
import expressAsyncHandler from "express-async-handler";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";

dotenv.config();

export const createMail = (req, res) => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  console.log("Generated OTP: ", otp);
  try {
    console.log("entered create mail request");
    let transporter = nodemailer.createTransport({
      service: "gmail",
      // secure: true,
      // port: 465,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    let mailOptions = {
      from: process.env.GMAIL_ENC_USER,
      to: req.body.email, // Replace with a valid email
      subject: req.body.subject, // Replace with a valid subject
      html: req.body.html,
      text: req.body.message,
    };
    console.log("mail options: ", mailOptions);

    transporter.sendMail(mailOptions, (err, info) => {
      console.log("mail response: ", info);
      if (err) {
        console.log("error occurred: ", err);
        return res.json({ message: "Error sending email." });
      }
      console.log("mail sent: ");
      console.log("Message sent: %s", info.messageId);
      res.status(200).json({ message: "Email sent successfully." });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email." });
  }
};
