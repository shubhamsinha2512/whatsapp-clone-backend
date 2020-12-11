const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const minChatDetails = new Schema({
    chatId:{
        type:mongoose.Types.ObjectId
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
        type:Number,
        required:[true, "add mobile no."]
    },
    name:{
        type:String,
        required:[true, "Add name"]
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