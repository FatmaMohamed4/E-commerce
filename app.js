const express=require('express')
const userRoute=require('./route/userRoute')
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/users',userRoute)






module.exports=app;
