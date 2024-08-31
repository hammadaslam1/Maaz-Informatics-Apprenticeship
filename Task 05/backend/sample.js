import nodemailer from "nodemailer";
import http from "http";

const server = http.createServer(async (req, res) => {
  console.log("enter server");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  console.log("transporter: ", transporter);

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: req.body.email,
    subject: "Maaz Informatics Mail Testing",
    text: req.body.message,
  };
  console.log("mail options: ", mailOptions);

  await transporter.sendMail(mailOptions, (err, res) => {
    console.log("mail response: ", res);
    if (err) {
      console.log("error occurred: ", err);
      console.error(err);
      return res.status(500).json({ message: "Error sending email." });
    }
    console.log("mail sent: ");
    console.log("Message sent: %s", info.messageId);
  });
});
server.listen(8080);
