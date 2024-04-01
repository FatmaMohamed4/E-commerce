const { default: mongoose } = require("mongoose")
const Category = require("../model/categoryModel.js")
const Item = require('../model/itemModel.js')


exports.addCategory = async (req,res)=>{
    try {
        const category = await Category.create(req.body)
        res.status(201).json({
            status:true,
            message:"New Cateogry",
            category :category 
        })
    }
    catch(err){
        res.status(401).json({
            status:false,
            error:err ,
            
        })
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ status: true, message: "All Categories", categories });
    } catch (err) {
        res.status(500).json({ status: false, error: err.message, message: "Internal Server Error" });
    }
}

exports.updateCategory =async (req,res) =>{
    try{
        const id = req.params.id
     const category = await Category.findByIdAndUpdate({_id:id},{$set:req.body},{new:true}) 

     if (category){
        res.status(201).json({
            status:true,
            message :"Category is updated " ,
            updatedCategoy :category
        })
    }
 } catch(err){
        res.status(401).json({
            status:false,
            message : "Category not found" 
        })
    }
}

exports.getCategory = async (req, res) => {
    try {
        //without populate //edit
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ status: false, message: "Category not found" });
        }
        const items = await Item.find({ categoryId })
        res.status(200).json({ status: true ,
            category  ,
              items });
    } catch (err) {
        res.status(500).json({ status: false, error: err.message, message: "Internal Server Error" });
    }
}

//correct
exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        //  // Check if id is a valid ObjectId ==>CHAT gpt
         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: false, message: "Invalid category ID" });
        }
        // Delete the category
        const category = await Category.findById(id)
        if (!category){
            {
                return res.status(404).json({
                    status: false,
                    message: "Category not found"
                });
            }
        } else{
            await Item.deleteMany({ categoryId: id });
            // await Category.findByIdAndDelete(id)
            await category.deleteOne()
            return res.status(200).json({
                status: true,
                message: "Category and associated items deleted successfully"
            });
        }
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        });
    }

}



