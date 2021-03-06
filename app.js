/**************Express***************/
const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


/**************Method-Override***************/
const methodOverride = require('method-override');
app.use(methodOverride("_method"));


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


/**************Flash***************/
const flash = require("connect-flash");
app.use(flash());


/**************Routes***************/
const profileRoutes = require("./routes/profile"),
	  rootRoutes    = require("./routes/index"),
	  authRoutes    = require("./routes/auth");

app.use(function(req, res, next) {
	// middleware used to avoid checking if a user is logged in every route
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
app.use(profileRoutes)
app.use(rootRoutes);
app.use(authRoutes);

// Heroku
app.listen(process.env.PORT || 50236, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// app.listen(8080, () =>{
// 	console.log('listening');
// });