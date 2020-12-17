const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const MessageSchema = require('./MessageSchema');

const minChatDetails = new Schema({
    chatId:{
        type:mongoose.Types.ObjectId,
        required:false
    },
    name:{
        type:String
    },
    lastMsg:{
        type:String
    }
});

const UserSchema = new Schema({
    mobile:{
        type:String,
        required:[true, "add mobile no."]
    },
    name:{
        type:String,
        required:[true, "Add name"]
    },
    password:{
        type:String,
        required:[true, "User : Specify password"]
    },
    lastseen:{
        type:String
    },
    order:{
        type:Number
    },
    chats:[minChatDetails]
});

module.exports = mongoose.model('User', UserSchema);