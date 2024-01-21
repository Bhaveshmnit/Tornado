const mongoose = require('mongoose')
//create a new user structure {name,email(primarykey),password(hash)}
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name']//you can take min and max length
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,//primary key
  },
  password: {
    type: String,
    required: [true, 'Please provide password']
  },
})
//export to auth constollers
module.exports = mongoose.model('User', UserSchema)