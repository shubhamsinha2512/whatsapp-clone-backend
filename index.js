const http = require('http');
const express = require('express');
const socket = require('socket.io');

var app = express();
var server = http.createServer(app);

express.use(express.static('public'));



server.listen(process.env.PORT || 8000);