const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const MessageSchema = new Schema({
    sender:{
        type:mongoose.Types.ObjectId,
        required:[true, "add msg sender"]
    },
    msg:{
        type:String,
        required:[true, "add message"]
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Message', MessageSchema);