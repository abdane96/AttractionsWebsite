var express = require("express");
var router = express.Router();
var user = require("../models/user");

router.get('/profile', (req,res) =>{
	res.render('landing');
});

module.exports = router;