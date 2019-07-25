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
let city = 'portland';
let url = 'http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}';
request(url, function (err, response, body) {
  if(err){
    console.log('error:', err);
  } else {
    console.log('body:', body);
  }
});

router.get('/', (req,res) =>{
	const ipInfo = req.ipInfo;
	var message = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country}`;
	console.log(message);
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