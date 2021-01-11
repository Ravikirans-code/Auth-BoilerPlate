const jwt = require('jwt-simple');
const User = require('../modules/user.js');

const config = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({sub:user.id, iat:timestamp}, config.secret); //sub => subject of  the token
}

exports.signin = function (req, res, next) {

    res.send({token: tokenForUser(req.user)})
}
exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({error: 'You must provide Email and Password'});//unprocessable entity
    }
    //see if a user with given email exists
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) { return next(err); }

        //If a user email does exist, return an error
        if(existingUser){
            return res.status(422).send({error: 'Email is in Use'});//unprocessable entity
        }
        //If a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password:password
        });
        user.save(function(err){
            if (err) { return next(err); }
            //Respond to reuest indicating the user was created.
            res.json({token: tokenForUser(user)});
            
        });
    });
}