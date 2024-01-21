const mongoose = require('mongoose');

const ResSchema = new mongoose.Schema({
        name:String,
         id: String,
        cloudinaryImageId: String,
        avgRating:String,
        cuisines:[String],
        costForTwo:String,
        deliveryTime:Number ,
        locality:String
      })

const favtSchema = new mongoose.Schema({
  userId: String,
  Cart: [ResSchema],
});

// Create the model
const Favt= mongoose.model('favt',favtSchema);

module.exports = Favt;
