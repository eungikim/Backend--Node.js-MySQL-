const crypto = require("crypto");
const nodemailer = require("nodemailer");

function generateResetToken() {
  return crypto.randomBytes(20).toString("hex");
}

async function sendResetPasswordEmail(email, resetToken, callBackURL) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mpoint1920@gmail.com",
      pass: "looj wclj wwjx uavq",
    },
  });

  console.log(email);

  await transporter.sendMail({
    from: "motyService@gmail.com",
    to: email,
    subject: "Reset Password",
    html: `
        <p>Please click the following link to reset your password:</p>
        <a href="${callBackURL}?token=${resetToken}" style="display: inline-block; background-color: #0074b7; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Now</a>
      `,
  });
}

module.exports = { generateResetToken, sendResetPasswordEmail };
