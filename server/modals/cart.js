const mongoose = require('mongoose');

// Subschema for an item in the menu
const cartItemSchema = new mongoose.Schema({
  name: String,
  id: String,
  description:String,
  type:String,
  price:Number,
  imageId:String,
  freq:Number
});

// Subschema for a category in the menu
const cartCategorySchema = new mongoose.Schema({
  userId: String,
  Total:Number,
  Cart: [cartItemSchema],
});

// Create the model
const UserCart= mongoose.model('Cart',cartCategorySchema);

module.exports = UserCart;
