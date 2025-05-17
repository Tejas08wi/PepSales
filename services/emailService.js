const nodemailer = require('nodemailer');

const sendEmail = async (to, content) => {
  console.log(`Sending email to ${to}: ${content}`);
  return Promise.resolve();
};

module.exports = { sendEmail }; 