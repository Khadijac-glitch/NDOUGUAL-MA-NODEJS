const nodemailer = require('nodemailer');

function sendResetPasswordEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'passpartoutsn@gmail.com',
      pass: 'afaq ywrb asby baky',
    },
  });

  const resetLink = `http://localhost:3000/recover?token=${token}`;
  const mailOptions = {
    to: email,
    subject: 'Password Reset',
    text: `Click this link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = sendResetPasswordEmail;
