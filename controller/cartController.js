const asyncHandler = require('express-async-handler');
const Cart = require("../model/cartModel.js");
const Item = require('../model/itemModel.js');
const { default: mongoose } = require('mongoose');
const { protect } = require('./authController.js');


const calcTotalCartPrice = (Cart) => {
  let totalPrice = 0;
  Cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  Cart.totalCartPrice = totalPrice;
  return totalPrice;
};

exports.addCart = async (req, res) => {
  try {
    const userId = req.params.id;
      const cart = await Cart.create({ userId, ...req.body });
      return res.json({ message: "Created a new cart", cart });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};

exports.addToCart = async (req, res) => {
  try {
    // // from protect
    // const userId = req.userId;
    
    const item =req.body
    const existItem = await Item.find({item})
    if(!existItem){
      res.status(4040).json({ 
        message: "Item not found", 
      });
    }else{
      await Cart.insertMany(item)
      res.status(200).json({ 
        message: `${item} added to cart successfully`, 
      });
    }
   
  }
   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



