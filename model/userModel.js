import { Schema, model } from 'mongoose'

const userSchema = new Schema ({
   fName :{
    type:String,
   //  required :true 
   } ,
   lName :{
    type:String,
   //  required :true 
   } ,
   email :{
    type:String,
   //  required :true 
   } ,
   password :{
    type:String,
   //  required :true 
   } ,
   confirmPassword :{
    type:String,
   //  required :true 
   } ,
   isAdmin :{
    type:Boolean,
    default: false ,
   //  required :true 
   } ,

},
{timestamps :true}
)

const userModel  = model('user',userSchema)

export default userModel