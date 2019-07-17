var express = require("express");
var router = express.Router();
var user = require("../models/user");

router.get('/users/:id', (req,res) =>{
	user.findById(req.params.id, function(err, foundUser){
	   if(err){
	       req.flash("error", "Can't find profile.")
	       return res.redirect("/")
	   }
	   res.render('users/show', {user: foundUser});
	});
});

module.exports = router;