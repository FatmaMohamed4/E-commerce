import mongoose, { Schema, model } from "mongoose";

const itemSchema = new Schema ({
    title :String ,
    desc :String ,
    img :String ,
    Size :{
        type:Array
    },
    color :{
        type:Array
    },
    price :{
        type :String
    }
} ,
{timestamps :true})

const itemModel = model('item' ,itemSchema)
export default itemModel





