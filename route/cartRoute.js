const express=require('express');
const { addCart, addToCart } = require('../controller/cartController.js');
// const { protect } = require('../controller/authController.js');

const router=express.Router();

router.post('/addCart/:id',addCart)
router.post('/add-to-cart',addToCart)
module.exports=router;
