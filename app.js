/**************Express***************/
const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


/**************BodyParser***************/
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));


/**************MongoDB***************/
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abdane:Rem99h21!!@cluster0-cioxd.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(()=>{
	console.log('connected to DB');
}).catch(err => {
	console.log(err.message);
});

/**************Models*************/
const user = require("./models/user");


/**************Passport*************/
const passport = require("passport"),
localStrategy = require("passport-local");
app.use(require("express-session")({
	secret: "Messi is the best player in history",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


/**************Routes***************/
app.get('/', (req,res) =>{
	res.render('landing');
});

app.get('/about', (req,res) =>{
	res.render('about');
});

app.get('/indoor', (req,res) =>{
	res.render('indoor');
});

app.get('/outdoor', (req,res) =>{
	res.render('outdoor');
});

app.get('/contact', (req,res) =>{
	res.render('contact');
});


/**************Authorization-Routes***************/
app.get('/register', (req,res) =>{
	res.render('register');
});

app.post('/register', (req,res) =>{
	user.register(
		new user({username: req.body.username}),
		req.body.password,
		(err, newUser) => {
			if(err){
				console.log(err);
				return res.render("register");
			}
			passport.authenticate("local")(req, res, function(){
				res.redirect("/");
			});
		}
	);
});

app.get('/login', (req,res) =>{
	res.render('login');
});

app.post('/login', passport.authenticate("local",{
	successRedirect: "/",
	failureRedirect: "/login"
}), (req,res) =>{
});


app.listen(3000, () =>{
	console.log('listening');
});