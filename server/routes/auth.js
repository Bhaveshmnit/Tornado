const express=require('express');
const { login, register, profile } = require('../controller/auth');
const auth = require('../middleware/authentication');
const router=express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/',auth).get(profile)
module.exports=router