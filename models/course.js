var mongoose = require('mongoose');

// COURSE SCHEMA
var CourseSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	date: Date,
	price: Number,
	address: String,
	duration: String,
	created_at: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("Course", CourseSchema);
