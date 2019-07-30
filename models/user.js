const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	avatar: {type: String, default: "https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png"},
	firstName: String,
	lastName: String,
	email: String,
	isAdmin: {
		type: Boolean,
		default: false
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);