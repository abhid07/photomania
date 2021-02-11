const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email: {
        type: String,
        lowercase:true
    },
    password:{
        type:String,
    },
    profilepic:{
        type:String,
        default:"https://res.cloudinary.com/photo-mania/image/upload/v1609333494/noprofilepic_kdgjdf.png"
    },
    followers:[{type:ObjectId,ref:'User'}],
    following:[{type:ObjectId,ref:'User'}]

})

const User = mongoose.model('User',UserSchema)

module.exports=User