// /config/passport.js
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {

	// Required Passport Functions
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});
	
	// Signup Function
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
		function(req, email, password, done){
			process.nextTick(function(){
				User.findOne({ 'local.email' : email }, function(err, user) {
					if(err){
						return done(err);
					}
					if(user){
						return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
					}
					else {
						var newUser = new User();
						newUser.local.email = email;
						newUser.local.password = newUser.generateHash(password);	
						newUser.save(function(err){
							if(err){
								throw err;
							}
							return done(null, newUser);
						});
					}
				});
			});
		}
	));

	// Login Function
	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true 
	},
		function(req, email, password, done) { 
			User.findOne({ 'local.email' :  email }, function(err, user) {
				if (err){
					return done(err);
				}
				if (!user || !user.validPassword(password)){
					return done(null, false, req.flash('loginMessage', 'User or Password incorrect.'));
				}
				return done(null, user);
			});
		}
	));
	
};