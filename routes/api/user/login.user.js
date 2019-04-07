const passport = require('passport')
const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/user.controller')
router.post('/login',controller.onLogin)
module.exports = router
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({success:"Login success" ,email : req.user.email})
})