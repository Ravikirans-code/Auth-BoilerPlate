const passport = require('passport');
const User = require('../modules/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local Strategy
const localLogin = new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {

    User.findOne({ email: email }, function (err, user) {
        if(err){return done(err)}
        
        if(!user){return done(null, false)}
        
        //compare password
        user.comparePassword(password, function(err, isMatch){
            if(err){return done(err)}

            if(!isMatch){return done(null, false)}

            return done(null, user);
            
        })

    });
});

//Setup a JWT options
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    //see if the user ID in the payload exists in our database
    //If it does, call done with that user
    //otherwise, call done without a user object

    User.findById(payload.sub, function (err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
});
//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);