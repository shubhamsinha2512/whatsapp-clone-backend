require('dotenv').config();

const http = require('http');
const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//Routing
const HomeRouter = require('./routes/HomeRouter');
const ChatRouter = require('./routes/ChatRouter');
const AuthRouter = require('./routes/AuthRouter');

//operations
const opr = require('./operations')

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(cookieParser("1234567890"));

const server = http.createServer(app);

mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true}, ()=>{
    console.log("Connected to DB");
})


app.use('/', HomeRouter);
app.use('/auth', AuthRouter);
app.use('/chat', opr.authMiddleware, ChatRouter);



server.listen(process.env.PORT || 8000, ()=>{console.log("Server Started")});