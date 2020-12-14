const AuthRouter = require('express').Router();
const passport = require('passport');
const Authenticate = require('../auth/Authenticate');
const User = require('../models/User');


var authResponse = {
    message:'',
    loginStatus:false
}

AuthRouter.route('/login')
.post((req, res)=> {
    // console.log(req.body.userDetails);
    User.findOne({mobile:req.body.userDetails.mobile}, 'mobile name password').then((user)=>{
        // console.log(user);
        //comment this when passport authentication is implemented
        if(!user){
            // res.sendStatus(401);
            res.setHeader('Content-Type', 'application/json');

            authResponse = {
                message:'No user Found',
                loginStatus:false
            }
            res.json(authResponse);
        }
        else{
            if(user.password != req.body.userDetails.password){
                res.setHeader('Content-Type', 'application/json');
                authResponse={
                    message:'Incorrect Password',
                    loginStatus:false
                }
                res.json(authResponse);
            }
            else{
                res.cookie("user", user.mobile);
                res.setHeader('Content-Type', 'application/json');
                authResponse={
                    message:"Login Successful",
                    loginStatus:true
                }
                res.json(authResponse);
            }
        }
    })
})


AuthRouter.route('/register')
.post((req, res)=>{
    //Check if user exists
    User.findOne({mobile:req.body.userDetails.mobile}, 'mobile').then((user)=>{
        if(user) {
            // console.log(user);
            res.setHeader('Content-Type', 'application/json');
            res.json({"message":"User Already exists"});
        }
        else{
            new User({
                mobile:req.body.userDetails.mobile,
                name:req.body.userDetails.name,
                password:req.body.userDetails.password,
                lastseen:null,
                order:null,
                chats:[]
            }).save(()=>{
                res.setHeader('Content-Type', 'application/json');
                res.json({"message":"Register Successful"});
            });
        }
    })
})

module.exports = AuthRouter;