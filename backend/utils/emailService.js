import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

export const sendReturnReminder = async (email, bookTitle, returnDate) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Book Return Reminder",
    text: `This is a reminder to return the book "${bookTitle}" by ${returnDate}. Thank you!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Return reminder email sent.");
  } catch (err) {
    console.error("Error sending return reminder email:", err);
  }
};
