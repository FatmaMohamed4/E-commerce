import express from "express"
import check  from 'express-validator'
import userController from "../controller/userController.js"
import { validateLogIn, validateRegistration } from "../validation/validation.js"

const userRoute = express.Router()

userRoute.post('/register',validateRegistration,userController.register)
userRoute.post('/login',validateLogIn,userController.logIn)


export default userRoute