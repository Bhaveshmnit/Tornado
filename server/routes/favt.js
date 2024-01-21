const express=require('express');
const { getFavt, updateFavt } = require('../controller/favt');

const router=express.Router();

router.route('/').get(getFavt);
router.route('/save').post(updateFavt);
module.exports=router
