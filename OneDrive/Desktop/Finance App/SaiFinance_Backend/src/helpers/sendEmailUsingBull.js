const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.sendEmailUsingBullWorker = async (job, done) => {
  const { to, subject, html, text = "Hello", pdfBuffer = null } = job.data;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_ID_NODEMAILER,
      pass: process.env.GOOGLE_KEY_NODEMALER,
    },
  });
  await transporter.sendMail({
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
  });
  done(null, "success:", "Mail sent successfully");
  done(null, `error:done`);
};
