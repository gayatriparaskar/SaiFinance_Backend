const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.sendEmail = async ({
  to,
  subject,
  html,
  text = "Hello",
  pdfBuffer = null,
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_ID_NODEMAILER,
      pass: process.env.GOOGLE_KEY_NODEMALER,
    },
  });
  transporter
    .sendMail({
      to: to,
      from: `Internship <${process.env.EMAIL_ID_NODEMAILER}>`,
      text: text,
      subject: subject,
      html,
      attachments: pdfBuffer
        ? [
            {
              filename: "offer-letter.pdf",
              content: pdfBuffer,
              contentType: "application/pdf",
            },
          ]
        : [],
    })
    .then(() => console.log("success:", "Mail sent successfully"))
    .catch((err) => console.log("error:", err));
};
