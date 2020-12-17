const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const MessageSchema = require('./MessageSchema');

const ChatSchema = new Schema({
    user1:{type:mongoose.Types.ObjectId, required:[true, "add user 1"]},
    user2:{type:mongoose.Types.ObjectId, required:[true, "add user 2"]},
    messages:[] //add MessageSchema later
},{
    timestamps:true
});

module.exports = mongoose.model('Chat', ChatSchema);