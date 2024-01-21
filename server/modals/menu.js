const mongoose = require('mongoose');

// Subschema for an item in the menu
const menuItemSchema = new mongoose.Schema({
  name: String,
  id: String,
  description:String,
  type:String,
  price:Number,
  imageId:String
});

// Subschema for a category in the menu
const menuCategorySchema = new mongoose.Schema({
  title: String,
  itemCards: [menuItemSchema],
});

// Main schema for the restaurant menu
const restaurantMenuSchema = new mongoose.Schema({
  id: String,
  categories: [menuCategorySchema],
});

// Create the model
const RestaurantMenu = mongoose.model('RestaurantMenu', restaurantMenuSchema);

module.exports = RestaurantMenu;
