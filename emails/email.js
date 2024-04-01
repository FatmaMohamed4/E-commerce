// const nodemailer = require('nodemailer');

// async function sendResetEmail(email, resetToken) {
//   try {
//     // Create a SMTP transporter
//     let transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: 'mail1project1@gmail.com', 
//         pass: 'dedbgjcvpeimmrwl' // Your Gmail password ==> from apps password 
//       }
//     });

//     // Send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"E-commerce App" <mail1project1@gmail.com>',
//       to: email,
//       subject: 'Password Reset',
//     //   text: `Here is your password reset token: ${resetToken}`, // Plain text body
//       html: `<p>Here is your password reset token: <strong>${resetToken}</strong></p>` 
//     });

//     console.log('Message sent: %s', info.messageId);
//     return true;
//   } catch (error) {
//     console.error('Error occurred while sending email:', error);
//     return false;
//   }
// }

// module.exports = sendResetEmail;
