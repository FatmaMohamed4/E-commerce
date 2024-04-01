const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      unique: [true , "User should have one Cart"]
    }, 

    cartItems: [
      {
        items: {
          type: mongoose.Schema.ObjectId,
          ref: 'Item',
        }
      }
    ],
    
    totalCartPrice: Number,
  },
  { timestamps: true }
);

const Cart  = mongoose.model('Cart',cartSchema)

module.exports=Cart;
