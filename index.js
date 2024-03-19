//Db mongodb://localhost:27017/E-commerce


import express from 'express'
import connectDB from './DBconn.js';
import itemRoute from './route/itemRoute.js';
import userRoute from './route/userRoute.js';



const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies


const PORT =4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB()

app.get('/',(req,res)=>{
    console.log('Hello Ecommerce app')
    res.send({message:'Hello Ecommerce app'})
})

app.use(itemRoute)
app.use(userRoute)

app.use('*', (req, res) => {
    res.json({ msg: "Cannot find the URL :" + req.originalUrl });
  });