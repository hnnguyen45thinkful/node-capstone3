// /app/routes.js
// Contains all main routes
module.exports = function(app, passport) {
	
	// Get Requests
	// Home Page
	app.get('/', function(req, res){
		res.render('index.ejs');
	});
	
	// Login Page
	app.get('/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});
	
	// Signup Page
	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});
	
	// Profile Page
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', { user : req.user });
	});
	
	// Logout hook, redirect Home
	app.get('/logout', function (req, res){
		req.session.destroy(function (err) {
			res.redirect('/'); 
		});
	});
	
	// Post Requests
	// Signup hook
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', 
		failureRedirect : '/signup', 
		failureFlash : true 
	}));
		
	// Login Hook
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', 
		failureRedirect : '/login', 
		failureFlash : true 
	}));
	
	// 404 Page
	app.get('*', function(req, res){
		res.render('error.ejs');
	});
	
};

// Simple middleware to check is user is logged in
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}