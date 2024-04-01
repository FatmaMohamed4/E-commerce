// const { JsonWebTokenError } = require('jsonwebtoken');
const jwt  = require('jsonwebtoken');
const User=require('../model/userModel');
const {promisify} =require ('util')
const crypto =require('crypto')
const nodemailer = require('nodemailer');
// const sendResetEmail =require('../emails/email.js')


exports.register=async (req,res)=>{
    try{
    const user = await User.create(req.body)
 
        res.status(201).json({
            status:true,
            message:"Sign up Successfully",
            
        })
    }
    catch(err){
        res.status(401).json({
            status:false,
            error:err ,
            
        })
    }
}

// //TODO: Login => Fatma // res.token
//reset password



exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        //
            if (!user || !await user.correctPassword(password, user.password)) {
                return res.status(401).json ({
                    status:false,
                    message :"Invaled email or password"
                })
            } 
            let token = jwt.sign({ userId: user._id }, 'E-commerce App# first App',{expiresIn:"90d"});  
            res.status(200).json({
                status: true,
                message: "Log in Successfully",
                token: token,
            });
        
    
    } catch (err) {
        res.status(401).json({
            status: false,
            error: err.message,
        });
        console.log(err);
    }
};



//if update password ==>log in again ==>protect

exports.protect= async(req,res,next) =>{
//token from user 
let token ;
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
    token=req.headers.authorization.split(" ")[1]
}
console.log(token)
if(!token){
    return res.status(404).json({status :false ,message :"please log in 1"})
}


//verfiy token with secret key
const decodedToken = await promisify (jwt.verify)(token,'E-commerce App# first App') //return id
console.log(decodedToken)
//check user (of token) is exist
const currentUser =await User.findById(decodedToken.userId)


  if(!currentUser){
    return res.status(404).json({
        message : "Sesstion is expired"
    })
  }


  req.user=currentUser
next()
}


// exports.forgotPassword = async (req, res, next) => {
//     try {
//         // Get user by email
//         const { email } = req.body;
//         const user = await User.findOne({ email });

//         // If user not found, return appropriate response
//         if (!user) {
//             return res.status(404).json({
//                 status: false,
//                 message: "User not found"
//             });
//         }

//         // Generate random reset token and save it to the user
//         const resetToken = user.createResetPasswordToken();
//         await user.save({ validateBeforeSave: false });

//         // Construct reset URL and message
//         const resetUrl = `http://localhost:3000/users/resetPassword/${resetToken}`;
//         const message = `Use this link to reset your password: ${resetUrl}`;

//         // Send email with reset token
//         await sendResetEmail({
//             email: user.email, // Recipient's email address
//             subject: 'Password Reset Request',
//             message: message // Body of the email
//         });

//         // Send success response
//         res.status(200).json({
//             status: true,
//             message: 'Password reset link has been sent to your email' ,
//             resetToken:resetToken
//         });
//     } catch (error) {
//         // If an error occurs, handle it gracefully
//         console.error('Error occurred while sending email:', error);
//         // Return an error response
//         return next('There was an error sending the password reset email');
//     }
// };



// exports.resetPassword = async (req, res, next) => {
//     try {
//         const { resetToken, newPassword } = req.body;

//         // Check if resetToken and newPassword are provided
//         if (!resetToken || !newPassword) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Reset token and new password are required"
//             });
//         }

//         // Find user by reset token
//         const user = await User.findOne({ passwordResetToken: resetToken });

//         // If user not found or reset token has expired, return appropriate response
//         if (!user || user.passwordResetTokenExpire < Date.now()) {
//             return res.status(404).json({
//                 status: false,
//                 message: "Invalid or expired reset token"
//             });
//         }

//         // Set new password and clear reset token fields
//         user.password = newPassword;
//         user.passwordResetToken = undefined;
//         user.passwordResetTokenExpire = undefined;
//         await user.save();

//         // Construct reset URL and message
//         const resetUrl = `http://localhost:3000/users/resetPassword/${resetToken}`;
//         const message = `Use this link to reset your password: ${resetUrl}`;

//         // Send email with reset token
//         await sendResetEmail({
//             email: user.email, // Recipient's email address
//             subject: 'Password Reset Request',
//             message: message // Body of the email
//         });

//         // Send success response
//         res.status(200).json({
//             status: true,
//             message: 'Password reset link has been sent to your email'
//         });
//     } catch (error) {
//         // If an error occurs, handle it gracefully
//         console.error('Error occurred while resetting password:', error);
//         // Return an error response
//         return next('There was an error resetting the password');
//     }
// };


// Generate a random reset code

function generateResetCode() {
    return crypto.randomBytes(20).toString('hex');
  }

 
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mail1project1@gmail.com', 
        pass: 'dedbgjcvpeimmrwl'
    }
  });
  
  // Generate a random reset code
  function generateResetCode() {
    return crypto.randomBytes(3).toString('hex').toUpperCase(); // Adjust the length of the reset code as needed
  }
  
  // Route to request password reset
  exports.forgetPassword= (req, res) => {
    const { email } = req.body;
  
    const user = User.find( User.email === email);
  
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    const resetCode = generateResetCode();
    user.resetCode = resetCode;
  
    const mailOptions = {
      from: 'mail1project1@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Your password reset code is: ${resetCode}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Error sending email');
      }
      console.log('Email sent: ' + info.response);
      res.status(200).send('Reset code sent to your email');
    });
  };
  
  exports.resetPassword =(req, res) => {
    const { email, resetCode, newPassword } = req.body;
  
    const user = User.find(User.email === email);
  
    if (!user ) {
      return res.status(400).send('Invalid user');
    }
    if( user.resetCode !== resetCode) {
        return res.status(400).send('Invalid code');
      }
  
    user.password = newPassword;
    user.resetCode = null; // Reset the reset code after password change
  
    res.status(200).send('Password reset successfully');
  };
  
