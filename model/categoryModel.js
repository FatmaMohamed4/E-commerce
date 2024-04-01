const mongoose = require('mongoose');
const categorySchema= new mongoose.Schema({
    categoryName :{
        type:String, 
        required :true ,
        unique :[true ,"This category is added before"] ,
        trim:true 
    } 
    , img :{
        type:String, 
        // required :true ,
    }
} ,
{timestamps :true})
const Category  = mongoose.model('Category',categorySchema)

module.exports=Category;