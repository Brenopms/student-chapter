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
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Course", CourseSchema);
