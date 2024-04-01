const mongoose=require('mongoose')
const http=require('http')
const app =require('./app')
const server=http.createServer(app);
const DB=`mongodb+srv://mail1project1:team123456@cluster0.kcqny2i.mongodb.net/E-commerce`
mongoose
  .connect(DB)
  .then((con) => {
    console.log('DB connection Successfully');
  });

server.listen(3000,()=>{
    console.log("Server listenting in port 3000")
})