import { check } from 'express-validator';

const validateRegistration = [
    check("email")
        .notEmpty().withMessage("Email is required")
        .isLength({ min: 5}).withMessage("Email is too short")
        .custom((value) => {
            const allowedDomains = ['@gmail.com', '@yahoo.com'];
            const domain = value.split('@')[1];
            if (!allowedDomains.includes(`@${domain}`)) {
                throw new Error('Invalid email domain.');
            }
            return true;
        }),

    check("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8, max: 25 }).withMessage("Password must be between 8 and 25 characters long"),

   

    check("fName")
        .notEmpty().withMessage("First name is required")
        .isLength({ min: 1, max: 45 }).withMessage("First name must be between 1 and 45 characters long"),

    check("lName")
        .notEmpty().withMessage("Last name is required")
        .isLength({ min: 1, max: 45 }).withMessage("Last name must be between 1 and 45 characters long")
]

export default validateRegistration