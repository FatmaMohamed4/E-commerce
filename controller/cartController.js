const asyncHandler = require('express-async-handler');
const Cart = require("../model/cartModel.js");
const Item = require('../model/itemModel.js');
const { default: mongoose } = require('mongoose');


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



