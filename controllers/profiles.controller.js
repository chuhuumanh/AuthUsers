const Profile = require('../models/Profile.model')
module.exports.getProfile =(req,res)=>{
    Profile.findOne({user : req.user.id})
    .then(profile=>{
        if(!profile){
           return res.json({error : "Tài khoản này chưa cập nhật Profile"})
        }
        else {
            res.json({profile})
        }
    })
    .catch(err => res.json({err : "Lỗi mẹ r"}))
  }
  module.exports.onPostProfile = (req,res)=>{
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
}