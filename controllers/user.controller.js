const bcrypt = require('bcrypt');
const validation = require('../validator/register.validation')
const User = require('../models/User.model')
const keys = require('../config/keys')
const jwt = require('jsonwebtoken')
module.exports.onRegister = (req,res)=>{
 console.log(req.body)
   const error = validation.checkValidate(req);
   if(!error){
     const UserMatched = new User({
      email : req.body.email,
      password : req.body.password,
      name : req.body.name
    })
      //hash pass
      bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(req.body.password,salt,(err,hash)=>{
           UserMatched.password = hash;
           User.findOne({email : UserMatched.email})
           .then(result=>{
             if(!result){
               UserMatched.save()
               res.json({success:"Đăng ký thành công"})
             }
             else {
               return res.status(404).json({error:"Tài khoản này đã có người sử dụng rồi"})
             }
           })
        
          })
      })
   }else {
       return res.status(404).json(error)
   }
}
module.exports.onLogin=(req,res)=>{
  const error = validation.checkValidate(req);
  if(!error){ 
    User.findOne({email : req.body.email})
    .then(user=>{
      if(!user){
        return res.status(404).json({error:"Tài khoản này chưa được đăng ký"})
      }else {
      bcrypt.compare(req.body.password,user.password)
      .then(isMatch=>{
        if(isMatch){
         const payload = {
           email : req.body.email,
           name : req.body.name
         }
         jwt.sign(payload,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
           
        res.json({
          success:true,
          token : "Bearer "+token
        })


         })
        }
        else {
          return res.status(404).json({Error : "Mật khẩu sai"})
        }
      })
      }
    })
  }
  else {
    return res.status(404).json(error)
  }
}