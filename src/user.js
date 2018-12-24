const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String
});

// User represents the entire collection of Users
const User = mongoose.model('user', UserSchema);

module.exports = User;
