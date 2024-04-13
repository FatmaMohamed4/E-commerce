const nodemailer = require('nodemailer');
// const User = require('../model/userModel.js');


function sendOTP(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: 'mail1project1@gmail.com', 
            pass: 'dedbgjcvpeimmrwl'
        }
    });

    // Email content
    const mailOptions = {
        from: 'mail1project1@gmail.com', 
        to: email, 
        subject: 'Your Reset Code  (OTP)', 
        text: `Your OTP is: ${otp}` 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred while sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// async function compareOTP(email, otp, res,newPassword) {
//     try {
//         // Find user by email
//         const user = await User.findOne({ email });
//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({
//                 status: false,
//                 message: "User not found"
//             });
//         }
//         // Check if OTP matches
//         if (user.otp != otp) {
//             console.log("Wrong OTP");
//         } else{
//         await User.findOneAndUpdate({ email }, { password: newPassword, otp: null }, { new: true });
//         return res.status(200).json({ status: true, message: 'Password reset successfully' });
//         }
        
//     } catch (error) {
//         console.error('Error finding user:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


module.exports = {
    sendOTP: sendOTP,
   
    // verifyOTP
    // compareOTP
}