const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

//User Model
const db = require("../models");

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'username'}, (username, password, done) => {
            //Match User
            db.Users.findOne({username})
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'That username is not registered.' });
                }

                //Match Password
                bcrypt.compare(password, user.password, (error, isMatch) => {
                    if (error) {
                        console.log(error);
                        throw error;
                    };

                    if (isMatch) { 
                        //Confirm correct password was entered
                         return done(null, user);
                    } else {
                        //Decline password entered
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            })
            .catch(error => console.log(error));
        })
    ); 

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done) => {
        db.Users.findById(id, (err, user) => {
            done(err, user);
        });
    });
}