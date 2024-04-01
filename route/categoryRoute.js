const express=require('express');

const {addCategory,getCategory,getAllCategory,updateCategory,deleteCategory} =require ('../controller/categoryController.js')
const router=express.Router();

router.post('/add',addCategory)

router.get('/:id',getCategory)
router.get('/',getAllCategory)

router.patch('/:id',updateCategory)

router.delete('/:id',deleteCategory)
module.exports=router;

