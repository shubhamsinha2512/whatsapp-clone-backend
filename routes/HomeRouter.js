const HomeRouter = require('express').Router();
const passport = require('passport');

HomeRouter.route('/')
.get((req, res)=>{
    // res.send("Get at Home");
    console.log("home", req.signedCookies);
    if(req.signedCookies){
        res.setHeader('Content-Type', 'application/json');
        res.json({
            loginStatus:true,
            mobile:req.signedCookies.user
        });
    }
    else{
        res.setHeader('Content-Type', 'application/json');
        res.json({
            loginStatus:false,
            mobile:''
        });
    }
})
.post((req, res)=>{
    res.send("Post at Home");
})

module.exports = HomeRouter;