import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

let mailOptions = {
  from: process.env.GMAIL_USER,
  to: "hammadaslam308@gmail.com", // Replace with a valid email
  subject: "Test Email",
  html: `<div>
  <h1>Hammad Aslam</h1>
  <p>
    my name is Muhammad Hammad Aslam, a recent IT Graduate from the University
    of Education, Lahore
  </p>
</div>
`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log("Error:", error);
  }
  console.log("Email sent:", info.response);
});
