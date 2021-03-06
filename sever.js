const express = require('express');
const bodyParser = require('body-parser')
var expressValidator = require("express-validator");
const mongoose = require('mongoose');
const passport = require('passport')
const db  = require('./config/keys')
const app = express();
app.use(expressValidator())
mongoose.connect(db.mongoURI, {useNewUrlParser: true})
.then(()=>{
    console.log("Mongosee connect")
})
const register = require('./routes/api/user/register.user.js')
const login = require('./routes/api/user/login.user.js')
const Profile = require('./routes/api/profile/profile.user.js')
const Post = require('./routes/api/Post/allPost.Post')
// use passport
app.use(passport.initialize())
require('./config/passport')(passport)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/user',register)
app.use('/api/user',login)
app.use('/api/profile',passport.authenticate('jwt',{session:false}),Profile)
app.use('/api/post',Post)





















app.listen(3000,()=>console.log("On port 3000"))