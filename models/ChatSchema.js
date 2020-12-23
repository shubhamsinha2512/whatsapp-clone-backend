const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const MessageSchema = require('./MessageSchema');

const ChatSchema = new Schema({
    u1:{
        userId: {type:mongoose.Types.ObjectId, required:[true, "add user 1 id"]},
        name: {type:String},
        mobile:{type:Number}
    },
    u2:{
        userId: {type:mongoose.Types.ObjectId, required:[true, "add user 2 id"]},
        name: {type:String},
        mobile:{type:Number}
    },
    messages:[] //add MessageSchema later
},{
    timestamps:true
});

module.exports = mongoose.model('Chat', ChatSchema);