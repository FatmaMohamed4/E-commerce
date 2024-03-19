import mongoose from 'mongoose';


async function connectDB() {
 const connect =await  mongoose.connect('mongodb+srv://mail1project1:team123456@cluster0.kcqny2i.mongodb.net/E-commerce')
if (connect){
    console.log('Database is Connected')
}
else {
    console.log('Failed to connect Database')
}

}

connectDB();

export default connectDB;