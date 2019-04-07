const passport = require('passport')
const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/profiles.controller')
const Profile = require('../../../models/Profile.model')

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user : req.user.id})
    .then(profile=>{
        if(!profile){
           return res.json({error : "Tài khoản này chưa cập nhật Profile"})
        }
    })
})
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const profileFields = {}
  profileFields.user = req.user.id
  if(req.body.contact) profileFields.contact = req.body.contact;
  if(req.body.contact) profileFields.website = req.body.website;
  if(req.body.contact) profileFields.handle = req.body.handle;
    Profile.findOne({user:req.user._id})
    .then(profile=>{
    if(profile){
      Profile.findOneAndUpdate(
          {user : req.user.id},
          {$set : profileFields},
          {new :true}
      ).then(profile=>res.json(profile))}
    else {
       new Profile(profileFields).save().then(profile=>res.json({profile}))
    }
    })
})

module.exports = router