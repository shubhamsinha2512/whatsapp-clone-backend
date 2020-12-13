const HomeRouter = require('express').Router();
const passport = require('passport');

HomeRouter.route('/')
.get((req, res)=>{
    res.send("Get at Home");
})
.post((req, res)=>{
    res.send("Post at Home");
})

module.exports = HomeRouter;