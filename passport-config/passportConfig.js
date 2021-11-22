const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../Models/UserSchema')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField : 'username'},(username ,password ,done)=> {
            //match user
            User.findOne({username : username}, (err, user) => {
                if (err) throw err;
                if(!user) {
                    return done(null,false);
                }
                //match pass
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;

                    if(isMatch) {
                        return done(null,user);
                    } else {
                        return done(null,false);
                    }
                })
            })
        })
        
    )
    passport.serializeUser(function(user, done) {
        if(user) {
            done(null, user.id);
        }
      });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if(user) {
                done(err, user);
            }
        });
      }); 
}; 