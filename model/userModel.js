const mongoose=require('mongoose'); //ORM 
const validator=require('validator')
const bcrypt=require('bcryptjs')
const userSchema = new mongoose.Schema ({
   fName :{
     type:String,
     minlength:[3,"fname at least have 8 letters"],
     maxlength:[20,"fname maxiumum have 20 letters"],
     trim:true,
     required :[true,"U must enter yoru first name"] 
   } ,
   lName :{
    type:String,
    minlength:[3,"lname at least have 8 letters"],
     maxlength:[20,"lname maxiumum have 20 letters"],
    required :[true,"U must enter yoru last name"] 
   } ,
   email :{
    type:String,
    validate:[validator.isEmail,"This not a valid Email"],
    unique:[true,"this Email used Before"],
   } ,
   password :{
    type:String,
   required :[true,"enter password please"] 
   } ,
   confirmPassword :{
    type:String,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
    required :[true,"enter  confirm password please"] 
   } ,
   isAdmin :{
    type:Boolean,
    default: false ,
  
   } ,

})




userSchema.pre('save', async function (next) { //middle ware 
   //only run if password modified
   if (!this.isModified('password')) {
     return next();
   }
   //hash password
   this.password = await bcrypt.hash(this.password, 12);
   this.confirmPassword = undefined;
 
   next();
 });



 userSchema.methods.correctPassword = async function (
   candidatePassword,
   userPassword
 ) {
   return await bcrypt.compare(candidatePassword, userPassword); // compare bt3mal hash le candidate we btcompare b3deha
 };

 
const User  = mongoose.model('User',userSchema)

module.exports=User;