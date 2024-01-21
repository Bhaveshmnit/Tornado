const mongoose = require('mongoose')

const RestroSchema = new mongoose.Schema({
  name: {
    type: String
  },
   id: {
    type: String,
    unique: true
  },
  cloudinaryImageId:{
    type: String
  },
  avgRating:{
     type:String
  },
  cuisines:{
    type:[String]
  },
  costForTwo:{
    type:String
  },
  deliveryTime:{
    type:Number
  },
  locality:{
   type:String
  }
})
//export to auth constollers
module.exports = mongoose.model('Restro', RestroSchema)