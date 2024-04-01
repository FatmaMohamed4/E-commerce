const express=require('express');
const { addCart } = require('../controller/cartController.js');

const router=express.Router();

router.post('/addCart/:id',addCart)

module.exports=router;
