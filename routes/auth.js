var express = require("express");
var router = express.Router();
var user = require("../models/user");
var passport = require("passport");

router.get('/register', (req,res) =>{
	res.render('register');
});

router.post('/register', (req,res) =>{
	user.register(
		new user({username: req.body.username}),
		req.body.password,
		(err, newUser) => {
			if(err){
				req.flash("error", err.message);
				return res.redirect("/register");
			}
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "Successfully registered, welcome "+user.username.charAt(0).toUpperCase() + user.username.slice(1)+"!");
				res.redirect("/");
			});
		}
	);
});

router.get('/login', (req,res) =>{
	res.render('login');
});

router.post('/login', passport.authenticate("local",{
	successRedirect: "/",
	failureRedirect: "/login",
	failureFlash: true,
	successFlash: 'Welcome back!'
}), (req,res) =>{
});

router.get('/logout', (req,res) =>{
	req.logout();
	req.flash("success", "Successfully Logged Out")
	res.redirect("/");
});

module.exports = router;