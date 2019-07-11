/**************Express***************/
const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


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
	res.render('outdoor');
});

app.listen(3000, () =>{
	console.log('listening');
});