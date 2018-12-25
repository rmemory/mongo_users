const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema
const UserSchema = new Schema({
	name: String
});

// User represents the entire collection of Users
const User = mongoose.model('user', UserSchema);

module.exports = User;
