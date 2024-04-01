const express=require('express')
const itemRoute=require('./route/itemRoute')
const userRoute=require('./route/userRoute')
const cartRoute =require('./route/cartRoute.js')
const categoryRoute =require('./route/categoryRoute.js')

const app = express();

app.use(express.json()); 

app.use('/users',userRoute)
app.use('/items',itemRoute)
app.use('/cart',cartRoute)
app.use('/category',categoryRoute)


module.exports=app;
