var express = require('express');
var router = express.Router();
const usermodel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");

// Set up Passport to use local strategy
passport.use(new localStrategy(usermodel.authenticate()));

// Render the home page
router.get('/', function(req, res) {
  res.render('index');
});

// Profile page route with authentication check
router.get('/profile', isLoggedIn, function(req, res) {
  res.render("profile");
});

// Register route
router.post('/register', function(req, res, next) {
  var userdata = new usermodel({
    username: req.body.username,
    secret: req.body.secret  // Corrected typo from "sectret" to "secret"
  });

  usermodel.register(userdata, req.body.password)  // Fixed typo: changed `req,body.password` to `req.body.password`
    .then(function(registereduser) {
      passport.authenticate("local")(req, res, function() {
        res.redirect('/profile');
      });
    })
    .catch(next);  // Added error handling for better debugging
});

// Login route
router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}));

// Logout route
router.get("/logout", function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Authentication check middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
