// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const compression = require('compression');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const exphbs  = require('express-handlebars');
const flash = require('connect-flash');
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const passport = require('passport');
const path = require("path");
const session = require('express-session');
const validator = require('validator');
const { ensureAuthenticated } = require('./config/auth');

// Require all models
// =============================================================
const db = require("./models");

// Passport Config
require('./config/passport')(passport);

// Require all models
// =============================================================
const Controller = require("./controller");

//load environment variables
// =============================================================
dotenv.config();

// Check for production
// =============================================================
const production = process.env.NODE_ENV == "production";

// Sets up the Express App
// =============================================================
const app = express();
let PORT = process.env.PORT || 3000;

// Handlebars Config
// =============================================================
const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    if_equal: (a, b, opts) => { 
      if (a == b) {
        return opts.fn(this)
      } else {
        return opts.inverse(this)
      }
    }
  }
});

// Sets up the Express with Handlebars
// =============================================================
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Sets up Cookies with the Express App
// =============================================================
app.use(cookieParser('keyboardCats'));

// Sets up the Express app to use session
// =============================================================
app.use(session({
  secret: 'keyboardCats',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// Sets up Passport Middleware
// =============================================================
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash and setup global variables to be passed into every view
// =============================================================
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

// Authenticate on all admin routes
// =============================================================
  app.all('/admin/*', ensureAuthenticated);

//apply production settings
// ==================   ===========================================
if (production) {
    // compress responses
    app.use(compression());
    // permit access to public file
    app.use(express.static(path.join(__dirname, '/public'), {maxage: '1y'}));
} else {
    //load environment variables
    dotenv.config();
    // permit access to public file
    app.use(express.static(path.join(__dirname, '/public')))
};

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
// =============================================================
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/portfolio";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

// Import Routes
// =============================================================
require("./routes/routes.js")(app, bcrypt, db, dotenv, Controller, ensureAuthenticated, nodemailer, passport, validator);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});