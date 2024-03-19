import express from "express"
import check  from 'express-validator'
import validateRegistration from "../validation/validation.js"
import userController from "../controller/userController.js"

const userRoute = express.Router()
userRoute.post('/register',validateRegistration,userController.register)
userRoute.post('/login',validateRegistration,userController.logIn)
export default userRoute