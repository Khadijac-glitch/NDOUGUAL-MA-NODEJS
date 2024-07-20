const nodemailer = require('nodemailer');
// require('dotenv').config();


// Configuration du transporteur d'e-mails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
        user: 'passpartoutsn@gmail.com',
        pass: 'afaq ywrb asby baky',
      }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

