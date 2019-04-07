const mongoose  = require('mongoose')
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
    //tham khảo user
    user : {
        type : Schema.Types.ObjectId,
        ref :"user"
    },
    contact : {
        type:String
    },
    website : {
        type:String
    },
    handle : {
      type:String,
      required : true  
    }
})
module.exports = mongoose.model('profile',ProfileSchema)