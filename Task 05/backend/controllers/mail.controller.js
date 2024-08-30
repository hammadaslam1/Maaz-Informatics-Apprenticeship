import nodemailer from "nodemailer";
import http from "http";
import expressAsyncHandler from "express-async-handler";
import otpGenerator from "otp-generator";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false,
  port: 465,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});
export const createMail = expressAsyncHandler(async (req, res) => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  console.log("Generated OTP: ", otp);
  try {
    console.log("entered create mail request");

    // const server = http.createServer(async (req, res) => {
    //   console.log("enter server");
    //   console.log("transporter: ", transporter);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: req.body.email,
      subject: "Maaz Informatics Mail Testing",
      text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`,
    };
    console.log("mail options: ", mailOptions);

    transporter.sendMail(mailOptions, (err, info) => {
      console.log("mail response: ", info);
      if (err) {
        console.log("error occurred: ", err);
        console.error(err);
        return res.json({ message: "Error sending email." });
      }
      console.log("mail sent: ");
      console.log("Message sent: %s", info.messageId);
    });
    // });
    // server.listen(8080);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email." });
  }
});
