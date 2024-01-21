const express=require('express');
const { ResCards, ResInfo, Name } = require('../controller/restro');
const router=express.Router();

router.route('/restroCards').get(ResCards);
router.route('/:id').get(ResInfo);
router.route('/name/:id').get(Name);

module.exports=router