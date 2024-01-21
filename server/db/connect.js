const mongoose = require('mongoose')
//url will get from .env file after config dotenv in app.js
const connectDB = (url) => {
  return mongoose.connect(url)
}
//connectDb is called in app.js 
module.exports = connectDB