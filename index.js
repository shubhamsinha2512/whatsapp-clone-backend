const http = require('http');
const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')


//Routing
const HomeRouter = require('./routes/HomeRouter');
const ChatRouter = require('./routes/ChatRouter');
const AuthRouter = require('./routes/AuthRouter');

const app = express();
app.use(express.static('public'));
app.use(express.json());

const server = http.createServer(app);
const dbUri = 'mongodb+srv://shubham:shubham@chat-app-db.x4ran.mongodb.net/chatDb?retryWrites=true&w=majority';

mongoose.connect(dbUri, {useNewUrlParser:true, useUnifiedTopology:true}, ()=>{
    console.log("Connected to DB");
})

// var db = mongoose.connection;

// const User = require('./models/User');
// const { ObjectId } = require('mongodb');

// var newUser = new User({
//     mobile:"8507284036",
//     name:"Shubham",
//     password:"abcdef",
//     lastseen:'',
//     order:'',
//     chats:[{
//         chatId:null,
//         name:'Neha',
//         lastMsg:''
//     }]
// });

// newUser.save();

app.use('/', HomeRouter);
app.use('/chat', ChatRouter);
app.use('/auth', AuthRouter);


server.listen(process.env.PORT || 8000, ()=>{console.log("Server Started")});