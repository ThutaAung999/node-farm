const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    //secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  console.log("transporter : ",transporter);
  // 2) Define the email options
  const mailOptions = {
    from: 'Htein Linn <exercise999123@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  console.log("mailOptions :",mailOptions);
  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;