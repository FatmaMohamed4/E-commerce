const express=require('express');
const router=express.Router();
const { addItem, getItems, getItemById, updateItem, deleteItem, deleteAllItems } = require('../controller/itemController.js');
const authController = require('../controller/authController.js')



router.post('/add',addItem)

router.get('/all',getItems)
router.get('/:id',getItemById)

router.patch('/:id',updateItem)

router.delete('/:id',deleteItem)
router.delete('/delete/all',deleteAllItems)
module.exports=router;
