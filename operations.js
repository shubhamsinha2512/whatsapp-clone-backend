//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

//Models
const User = require('./models/UserSchema')
const Chat = require('./models/ChatSchema')
const Message = require('./models/MessageSchema')

exports.createJwtToken = (user) => { //returns token
    // console.log(user);
    var jwtToken = jwt.sign({
        mobile: user.mobile,
        name: user.name
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : '60s' //Change to 24h later
    });
    return jwtToken;
}

exports.validateToken = (token) => { //returns boolean
    var validityStatus;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data)=>{
        if(err){validityStatus=false}
        else{validityStatus=true}
    });
    return validityStatus=false;
}

exports.authStatus = (req) => {

    varbearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        var bearerToken = bearerHeader.split(' ')[1];
        if (this.validateToken(bearerToken)) {
            return true;
        }
        return false;
    }
    return false;    
}

exports.authMiddleware = (req, res, next) => {
    
    if(this.authStatus(req)){
        console.log("middleware");
        next();
    }else{
        console.log("middleware");
        // throw "Invalid User ID";
        res.redirect('/auth/login');
        return;
    }
}