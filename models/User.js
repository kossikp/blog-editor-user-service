
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		max: 64,
		required: true
	},
    lastName: {
		type: String,
		trim: true,
		max: 64,
		required: true
	},
	email: {
		type: String,
		trim: true,
        max: 128,
		required: true
	},
	password: {
		type: String,
		required: true
	},
}, {
	timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = { User };