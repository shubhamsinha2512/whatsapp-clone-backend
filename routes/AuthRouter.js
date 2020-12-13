const AuthRouter = require('express').Router();
const passport = require('passport');
const Authenticate = require('../auth/Authenticate');
const User = require('../models/User');

AuthRouter.route('/login')
.post((req, res)=> {
    // console.log(req.body);
    User.findOne({mobile:req.body.mobile}, 'mobile name password').then((user)=>{
        // console.log(user);
        //comment this when passport authentication is implemented
        if(!user){
            res.send("No user Found");
        }
        else{
            if(user.password != req.body.password)
                res.send("Incorrect Password");
            else{
                res.cookie("user", user.mobile);
                res.send("Login Successful");
            }
        }
    })
})


AuthRouter.route('/register')
.post((req, res)=>{
    //Check if user exists
    User.findOne({mobile:req.body.mobile}, 'mobile').then((user)=>{
        if(user) res.send("User Already exists");
        else{
            new User({
                mobile:req.body.mobile,
                name:req.body.name,
                password:req.body.password,
                lastseen:null,
                order:null,
                chats:[]
            }).save(()=>{
                res.send("Register Successful");
            });
        }
    })
})

module.exports = AuthRouter;