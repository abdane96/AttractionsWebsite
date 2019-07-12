var express = require("express");
var router = express.Router();

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

module.exports = router;