var express = require("express");
var router = express.Router();
var user = require("../models/user");

router.get('/', (req,res) =>{
	res.render('landing');
});

router.get('/about', (req,res) =>{
	res.render('about');
});

router.get('/indoor', (req,res) =>{
	res.render('indoor');
});

router.get('/outdoor', (req,res) =>{
	res.render('outdoor');
});

router.get('/contact', (req,res) =>{
	res.render('contact');
});

router.get('/about', (req,res) =>{
	res.render('about');
});

router.get('/membership', (req,res) =>{
	res.render('membership');
});

module.exports = router;