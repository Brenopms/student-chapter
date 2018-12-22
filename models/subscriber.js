const mongoose = require('mongoose');

// COURSE SCHEMA
const SubscriberSchema = new mongoose.Schema({
    course: String,
    name: String,
	quantity: Number,
	email: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Subscriber", SubscriberSchema);
