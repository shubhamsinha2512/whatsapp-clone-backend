const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UserSchema')

passport.use(new LocalStrategy((username, password, done) => {
    User.find({mobile:username}, 'mobile name password').then((err, user)=>{
        if(err) return done(err);

        if(!user) return done(null, false, {message:"Incorrect Username"})
        
        else{
            if(!user.validPassword(password)){
                return done(null, false, {message:'Incorrect Password'})
            }

        return done(null, user);
        }
    })
}));