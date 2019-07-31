var express = require("express");
var router = express.Router();
var user = require("../models/user");
const expressip = require('express-ip');
router.use(expressip().getIpInfoMiddleware);

/**************Send email***************/
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rahal.contact.form@gmail.com',
    pass: 'TestTest123!'
  }
});


/**************Request***************/
const request = require('request');
let apiKey = 'd7023e77f68d759c6b3dba622e3283f6';

router.get('/', (req,res) =>{
	const ipInfo = req.ipInfo;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${ipInfo.city}&units=metric&appid=${apiKey}`;
	request(url, function (err, response, body) {
  	if(err){
  		req.flash('error', err);
  		res.render('landing');
	  } else {
	  	let weather = JSON.parse(body);
	    res.render('landing', {weather: weather});
	  }
	});
	
});


router.get('/about', (req,res) =>{
	res.render('about');
});
router.get('/shop', (req,res) =>{
	res.render('shop');
});

router.get('/seasons', (req,res) =>{
	res.render('outdoor');
});

router.get('/contact', (req,res) =>{
	res.render('contact');
});

router.post('/contact', (req,res) =>{
	var mailOptions = {
	  from: 'rahal.contact.form@gmail.com',
	  to: 'rahal.contact.form@gmail.com',
	  subject: 'Contact Form, name: ' + req.body.firstname + ' From: ' + req.body.country,
	  text: req.body.message
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		req.flash("error", error);
		return res.redirect('/contact');
	  }
	  req.flash("success", "Email sent! We'll reply as soon as possible :)")
	  res.redirect('/contact');
	});
	
});

router.get('/about', (req,res) =>{
	res.render('about');
});

router.get('/membership', (req,res) =>{
	res.render('membership');
});

module.exports = router;