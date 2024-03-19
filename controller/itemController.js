import mongoose from 'mongoose';
import itemModel from '../model/itemSchema.js';


class itemController {
    static addItem = async(req,res)=>{
        try {
            const { title, desc, img, size, color, price } = req.body;
            const newItem = await itemModel.create(req.body)
            res.status(201).json({ 
                success: true,
                data: newItem
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ 
                success: false,
                error: "Failed to add a new item"
            });
        }
   }

    static getItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await itemModel.findById(id);
        if (item) {
            res.status(200).json({ success: true, data: item }); 
        } else {
            res.status(404).json({ success: false, error: "Item not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
   }
 
   static updateItem =async (req,res) =>{
    try {
        const id = req.params.id;
        const item = await itemModel.findByIdAndUpdate(id, req.body, { new: true });
        if (item) {
            res.json({ msg: "Updated Item", item });
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send('Internal Server Error');
    }
  }
 
  static deleteItem  =async (req,res)=>{
    try {
        const id = req.params.id
        const deleteItem = await itemModel.findByIdAndDelete(id);

        if (deleteItem) {
            res.json({ msg: "Item deleted successfully" });
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        console.error('Error deleting Item:', error);
        res.status(500).send('Internal Server Error');
    }
  }
}
export default itemController