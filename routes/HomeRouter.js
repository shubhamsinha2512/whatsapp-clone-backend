const HomeRouter = require('express').Router();
const opr = require('../operations');

HomeRouter.route('/')
.get((req, res)=>{
    console.log("Get at Home");
    if(opr.authStatus(req)){
        res.setHeader('Content-Type', 'application/json');
        res.json({
            authStatus:true,
            mobile:1234
        });
    }
    else{
        res.setHeader('Content-Type', 'application/json');
        res.json({
            authStatus:false,
            mobile:''
        });
    }

})
.post((req, res)=>{
    res.send("Post at Home");
})

module.exports = HomeRouter;