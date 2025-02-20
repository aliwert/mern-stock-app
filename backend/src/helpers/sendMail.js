"use strict";

const nodemailer = require("nodemailer");

module.exports = function (to, subject, message) {
  // Set Passive:
  return true;

  //? GoogleMail (gmail):
  const mailSettings = {
    service: "Gmail",
    user: "username@gmail.com",
    pass: "password",
  };

  // Connect to mailServer:
  const transporter = nodemailer.createTransport({
    service: mailSettings.service,
    auth: {
      user: mailSettings.user,
      pass: mailSettings.pass,
    },
  });
  // SendMail:
  transporter.sendMail(
    {
      from: mailSettings.user,
      to: to,
      subject: subject,
      text: message,
      html: message,
    },
    (error, info) => {
      error ? console.log(error) : console.log(info);
    }
  );
};
