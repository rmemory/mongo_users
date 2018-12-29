const mongoose = require('mongoose');
const PostSchema = require('./post_schema');
const Schema = mongoose.Schema;

// User schema
const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: 'Name must be longer than 2 characters.'
		},
		required: [true, 'Name is required.'],
	},
	//postCount: Number, // see virtual field below
	posts: [PostSchema],
	likes: Number,
});

// Not using an arrow function to not inherit "this"
UserSchema.virtual('postCount').get(function() { // ES6 getter
	// here "this" refers to a User instance
	return this.posts.length; // not persisted
});

// User represents the entire collection of Users
const User = mongoose.model('user', UserSchema);

module.exports = User;
