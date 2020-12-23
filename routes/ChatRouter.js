const ChatRouter = require('express').Router();
const Chat = require('../models/ChatSchema');
const Message = require('../models/MessageSchema');
const User = require('../models/UserSchema');

ChatRouter.route('/')
    .get((req, res) => {
        //get all chats for a user
        // console.log(req.user);
        User.find({mobile:req.user.mobile}, 'chats')
        .then((chats)=>{
            res.setHeader('Content-Type', 'applicaton/json');
            res.json(chats);
        })
        .catch(err => res.send(err));
        // res.send("Get at /chat");
    })
    .post((req, res)=>{
        //to create new chat
        const u1m = req.body.newChat.u1m, u2m = req.body.newChat.u2m;
        //get the users included whose details are included in request
        User.find({mobile:[u1m, u2m]}, '_id name mobile chats')
        .then((users)=>{
            // console.log(users);
            //if both users exsist
            if(typeof users[0] !== 'undefined' && typeof users[1] !== 'undefined'){
                //if exists, then check if chat exists previously
                Chat.findOne({"u1.mobile":{$in:[users[0].mobile, users[1].mobile]}, "u2.mobile":{$in:[users[0].mobile, users[1].mobile]}})
                .then((chat)=>{
                    // console.log(chat);
                    //if chat exists reutrn chat
                    if(chat) {
                        res.setHeader('Content-Type','application/json');
                        res.json(chat);
                    }
                    else{
                        //else create new chat
                        new Chat({
                        u1:{
                            userId: users[0]._id,
                            name:users[0].name,
                            mobile:users[0].mobile
                        },
                        u2:{
                            userId: users[1]._id,
                            name:users[1].name,
                            mobile:users[1].mobile
                            }
                        }).save().then((newChat)=>{
                            //update newly created chat to both users
                            users[0].chats.push({
                                chatId: newChat._id,
                                name:users[1].name,
                                lastMsg:''
                                });
                            users[1].chats.push({
                                chatId: newChat._id,
                                name:users[0].name,
                                lastMsg:''
                                });

                            // console.log(users[0].chats, users[1].chats);
                            users[0].save();
                            users[1].save();
                            res.setHeader('Content-Type', 'application/json');
                            res.json(newChat);
                        })
                    }
                })
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.json({message:"Invalid Data, mobile no. not registered"});
            }
        })
    })


    ChatRouter.route('/search') //to search if user exsists
    .get((req, res)=>{
        const mobile = req.body.mobile;
        // console.log(mobile);
        User.findOne({mobile: mobile}, 'mobile name')
        .then((user)=>{
            if(user){
                res.setHeader('Content-Type', 'application/json');
                res.json(user)
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.json({message: "no user found"});
            }
        })
    })

ChatRouter.route('/:chatId')
    //Get chat for chatId
    .get((req, res) => {
        const chatId = req.params.chatId;
        Chat.findOne({_id:chatId}, "_id u1 u2 messages")
        .then((chat)=>{
            if(chat) {
                res.setHeader('Content-Type','application/json');
                res.json(chat);
            }
            else{
                res.setHeader('Content-Type','application/json');
                res.json({message:"Invalid Chat Id"});
            }
        })
        //Get message for chatId
    })
    .post((req, res) => {
        //add new message in chat
        const chatId = req.params.chatId;
        const newMsg = req.body.newMsg;

        Chat.findOne({_id:chatId}, "messages")
        .then((chatMessages)=>{
            // res.send(chatMessages);
            chatMessages.messages.push(newMsg);
            chatMessages.save().then((msg)=>{
                res.setHeader('Content-Type', 'application/json');
                res.json(msg);
            });
            
        })
    })



module.exports = ChatRouter;