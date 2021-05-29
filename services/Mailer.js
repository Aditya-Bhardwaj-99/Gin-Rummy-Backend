const nodemailer = require('nodemailer');
const mailuser = require('../constants/SecurityConstants').getMailUser()
const mailpass = require('../constants/SecurityConstants').getMailPass()

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: '465',
  secure: true, // true for 465, false for other ports
  auth: {
    user: mailuser, // generated ethereal user
    pass: mailpass, // generated ethereal password
  },
});


const sendConfirmation = (to, token) => {
  return new Promise((resolve, reject) => {
    if (!token) return reject({type:false,err:'Token empty'});
      const options =  {
        from: `Gin Rummy <${mailuser}>`,
        to:to,
        subject:'Confirmation Mail',
        html:`<H3>Click on the following link to complete registration http://localhost:3000/mailredirectcheckjwt/${token}</H3><br><p>The link will expire in 20 minutes</p>`
      };
      transporter.sendMail(options, (error, info) => {
        if (error) reject({err:error,type:false});
        else resolve({msg:info,type:true});
      });
    });
};

module.exports.sendConfirmation = sendConfirmation