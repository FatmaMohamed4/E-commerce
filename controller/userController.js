// import mongoose from "mongoose";
import { validationResult } from "express-validator";
import bcryptjs from 'bcryptjs'
import  Jwt  from 'jsonwebtoken';
import userModel from "../model/userModel.js";

class userController {
    static register = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json(errors.array());
        } else {
            try {
                const { fname,lname, email, password, confirmPassword} = req.body;
                const existingEmail = await userModel.findOne({ email });
                if (existingEmail) {
                    return res.status(409).json({ error: 'User with this email already exists' });
                }
                if (password != confirmPassword){
                    res.json({msg :"password does not match"})
                } else{
                const hashedPassword = await bcryptjs.hash(password, 10);
                const newUser = await userModel.create(req.body)
            
    
                res.status(201).json({ message: 'Registration successful' });
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    static logIn = async (req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
    
        try {
            const { email, password } = req.body;
    
            const user = await userModel.findOne({ email });
    
            if (!user) {
                return res.status(401).json({ error: 'Invalid email' });
                // // more security
                // return res.status(401).json({ error: 'Invalid email or password' });
            }
    
            if (!user.password) {
                return res.status(401).json({ error: 'No password found for the user' });
            }
    
            const isPasswordValid = await bcryptjs.compare(password, user.password);
    
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid password' });
                 // // more security
                // return res.status(401).json({ error: 'Invalid email or password' });
            }
    
            let token = Jwt.sign({userID : user._id},'E-commerce app')
             res.cookie('token', token, { httpOnly: true })
            res.status(200).json({ message: "Login done", token });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
}

export default userController