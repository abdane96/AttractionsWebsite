const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	avatar: {type: String, default: "https://pngimage.net/wp-content/uploads/2018/06/logo-user-png-6.png"},
	firstName: {type: String, default: ""},
	lastName: {type: String, default: ""},
	email: String,
	isAdmin: {
		type: Boolean,
		default: false
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);