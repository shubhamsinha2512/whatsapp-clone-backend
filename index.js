const http = require('http');
const express = require('express');
const socket = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.createServer(app);


server.listen(process.env.PORT || 8000, ()=>{console.log("Server Started")});