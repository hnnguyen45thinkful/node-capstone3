
// Initial Setup
// Main App Variables/Requirements
var express 			= require('express');
var app 					= express();
var configApp			= require('./config/app-config.js');
var port 					= process.env.PORT || 8080;
var mongoose			= require('mongoose');
var passport 			= require('passport');
var flash 				= require('connect-flash');
var morgan 				= require('morgan');
var cookieParser	= require('cookie-parser');
var bodyParser		= require('body-parser');
var session 			= require('express-session');
var path 					= require('path');

// Set promise to fix depreciated mongoose issue
mongoose.Promise = global.Promise;

// Connect to mongodb (initially set to localhost, node-auth database)
mongoose.connect(configApp.mongoUrl);

// Passport signup/login functions
require('./config/passport')(passport);
	
// express setups
// basics
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));	
app.use(bodyParser.json());

// session & passport
app.use(session({ 
	secret: configApp.sessionSecret,
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Static 'public' directory
app.use("/public", express.static(path.join(__dirname, 'public')));

// set ejs as main templating engine
app.set('view engine', 'ejs');

// file where all routes will be put
require('./app/routes.js')(app, passport);

// start application on localhost and port set in /config/app-config.js
app.listen(port, 'localhost', function(){
	console.log("Server running at localhost:" + port + "/");
});