var express = require("express");
var router = express.Router();
var user = require("../models/user");
var sharp = require('sharp');
var multer = require('multer');
var fs = require('fs');
var middleware = require("../middleware/index")

var uploadPicture = multer({
	dest: 'temp/'
});
    
// router.post('/users/:id', uploadPicture.single('profileIcon'), function (req,res) {
// 	fs.readFile(req.file.path, function (err, data) {
//     	if (err){
//     		res.end('UNRESOLVABLE ERROR');
//     	}
// 		sharp(data).resize(200, 200).toFile('../public/images/userAvatars/'+req.user.username, function (err, info) {
// 			//DELETE THE TEMPORAL FILE
//         	fs.unlink(req.file.path, function (error) {
//         		if (error) res.end('UNRESOLVABLE ERROR'); //CODE 3 ALARM
//             	res.end('success');
//         	});
// 		});
// 	});
// });

router.get('/users/:id/edit', middleware.loggedIn, middleware.isUser, (req,res) =>{
	user.findById(req.params.id, function(err, foundUser){
	   if(err){
			req.flash("error", "Can't find profile, or profile is not yours.")
			return res.redirect("/")
	   }
	   res.render('users/edit', {user: foundUser});
	});
});

router.put('/users/:id', middleware.loggedIn, middleware.isUser, (req,res) =>{
	user.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
		if(err){
			req.flash("error", err);
			return res.redirect("/users/"+req.params.id);
		}
		res.redirect("/users/"+req.params.id);
	});
});

router.get('/users/:id', middleware.loggedIn, middleware.isUser, (req,res) =>{
	user.findById(req.params.id, function(err, foundUser){
	   if(err){
	       req.flash("error", "Can't find profile, or profile is not yours.")
	       return res.redirect("/")
	   }
	   res.render('users/show', {user: foundUser});
	});
});

module.exports = router;