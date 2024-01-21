const express=require('express');
const {getCart, updateCart} = require('../controller/cart');
const router=express.Router();

router.route('/').get(getCart);
router.route('/save').post(updateCart);
module.exports=router
