const { default: mongoose } = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
    type:String,
    minlength:[3,"item name at least have 3 letters"],
    maxlength:[20,"item name maxiumum have 20 letters"],
    required :[true,"U must enter item name "] 
    } ,

    price :{
        type:String, 
        required :[true,"U must enter item price "] 
    } ,

    size :{
        type : Array ,
        // required :[true,"U must enter item sizes "]
    },

    desc :{
        type:String,
        minlength:[3,"item describtion at least have 3 letters"],
        maxlength:[100,"item describtion maxiumum have 100 letters"],
        required :[true,"U must enter item describtion "] 
    } ,

    img :{
        type :String ,
        // required :[true,"You should add item images"] ,

    },

    color :{
        type : Array ,
        // required :[true, "Enter valid Colors "]
    } ,
    quantity :{
        type :Number ,
        default :0,
        
    } ,
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'  
        // , required: true
    }

})

const Item  = mongoose.model('Item',itemSchema)

module.exports=Item;