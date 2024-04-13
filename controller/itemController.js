const Category = require("../model/categoryModel.js")
const Item = require("../model/itemModel.js")

exports.addItem =async (req,res)=>{
    try{
        const item = await Item.create(req.body)
            res.status(201).json({
                status:true,
                message:"new item is added",
                item :item
                
            })
        }
        catch(err){
            res.status(401).json({
                status:false,
                error:err ,
                
            })
        }
}

exports.getItems =async (req,res) =>{
    try{
      const items = await Item.find()

      res.status(201).json({
        status:true,
        message:"Items",
        items:items ,
        user:req.user
        
    })
    }
    catch(err){
        res.status(401).json({
            status:false,
            error:err ,
            
        })
    }
}

exports.getItemById =async (req,res)=>{
    try{
     const id = req.params.id
     const item = await Item.findById({_id:id}) 
     if (item){
        res.status(201).json({
            status:true,
            item :item
        })
     }else {
        res.json ({
            message : "Item not found"
        })
     }

    }
    catch(err){
        res.status(401).json({
            status:false,
            error:err ,   
        })
    }
}

exports.updateItem = async (req,res) =>{
    try{
        const id = req.params.id
     const item = await Item.findByIdAndUpdate({_id:id},{$set:req.body},{new:true}) 

     if (item){
        res.status(201).json({
            status:true,
            message :"Item is updated " ,
            updatedItem :item
        })
    }
 } catch(err){
        res.status(401).json({
            status:false,
            message : "Item not found"
            // error:err ,   
        })
    }
}
 
exports.deleteItem = async (req,res) =>{
    try{
        const id = req.params.id
        const item = await Item.findByIdAndDelete({_id:id},{new:true}) 
   
        if (item){
           res.status(201).json({
               status:true,
               message :"Item is deleted " ,
            //    item :item
           })
       }else {
       res.json ({message : "Item not found"}) 
       }
    }
    catch(err){
        res.status(401).json({
            status:false,
            message : "Item not found err : the length of id is incorrect" ,
            // error:err ,   
        })
    }

}

exports.deleteAllItems = async (req,res)=>{
    try{
        const items = await Item.find().deleteMany()
        if(!items){
            res.status(404).json({
                status:false,
                message :"Items Not found"
            })
        }
        res.status(201).json({
          status:true,
          message:"Items deleted",
      })
      }
      catch(err){
          res.status(401).json({
              status:false,
              error:err ,
              
          })
      }
}

