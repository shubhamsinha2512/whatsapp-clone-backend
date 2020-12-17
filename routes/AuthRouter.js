const AuthRouter = require('express').Router();
const passport = require('passport');
const Authenticate = require('../auth/Authenticate');
const User = require('../models/UserSchema')
const jwt = require('jsonwebtoken');

const opr = require('../operations');

var authResponse = {
    user: {},
    message: '',
    loginStatus: false,
    jwtToken: null
}

AuthRouter.route('/login')
    .get((req, res)=>{
        res.send("Get at /auth/login");
    })
    .post((req, res) => {

        //check if userDetails object is defined
        if (typeof req.body == 'undefined' || typeof req.body.userDetails == 'undefined' || typeof req.body.userDetails.mobile == 'undefined' || typeof req.body.userDetails.password == 'undefined') {
            res.send('Send proper object userDetails:{mobile, password}');
            return;
        }

        // console.log(req.body.userDetails);
        User.findOne({
            mobile: req.body.userDetails.mobile
        }, 'mobile name password').then((user) => {
            // console.log(user);
            //comment this when passport authentication is implemented
            if (!user) {
                // res.sendStatus(401);
                res.setHeader('Content-Type', 'application/json');
                authResponse = {
                    user: null,
                    message: 'No user Found',
                    loginStatus: false,
                    jwtToken: null
                }
                res.json(authResponse);
            } else {
                if (user.password != req.body.userDetails.password) {
                    res.setHeader('Content-Type', 'application/json');
                    authResponse = {
                        user: null,
                        message: 'Incorrect Password',
                        loginStatus: false,
                        jwtToken: null
                    }
                    res.json(authResponse);
                } else {
                    var jwtToken = opr.createJwtToken({mobile: user.mobile, name: user.name});
                    res.cookie("token", jwtToken); //Change storage to local-storage at frontend
                    res.setHeader('Content-Type', 'application/json');
                    authResponse = {
                        user: {
                            mobile: user.mobile,
                            name: user.name
                        },
                        message: "Login Successful",
                        loginStatus: true,
                        jwtToken: jwtToken
                    }
                    res.json(authResponse); //data returned | do redirection at frontend                  
                }
            }
        })
    })


AuthRouter.route('/register')
    .post((req, res) => {

        //check if req body is defined
        if (typeof req.body == 'undefined' || typeof req.body.userDetails == 'undefined' || typeof req.body.userDetails.mobile == 'undefined' || typeof req.body.userDetails.name == 'undefined' || typeof req.body.userDetails.password == 'undefined') {
            res.send('Send userDetails:{mobile, name, password}');
            return;
        }

        //Check if user exists
        User.findOne({
            mobile: req.body.userDetails.mobile
        }, 'mobile').then((user) => {
            if (user) {
                // console.log(user);
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    "message": "User Already exists"
                });
            } else {
                new User({
                    mobile: req.body.userDetails.mobile,
                    name: req.body.userDetails.name,
                    password: req.body.userDetails.password, //hash passwords later
                    lastseen: null,
                    order: null,
                    chats: []
                }).save((err, newUser) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        "message": "Register Successful",
                        jwtToken:opr.createJwtToken({mobile: newUser.mobile, name:newUser.name})
                    });
                });
            }
        })
    })

module.exports = AuthRouter;