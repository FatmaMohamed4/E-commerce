const express=require('express')
const authController=require('../controller/authController')
const router=express.Router();


router.post('/register',authController.register)
router.post('/login',authController.logIn)
router.post('/forgotPassword', authController.forgetPassword);
// router.post('/reset', authController.resetPassword);
module.exports=router;
