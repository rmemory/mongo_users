const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middlware', () => {
	let joe, blogPost;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });

		joe.blogPosts.push(blogPost);

		Promise.all([joe.save(), blogPost.save()])
			.then(() => done());
	});

	// it.only('users clean up dangling blogposts on remove', (done) => {
		it('users clean up dangling blogposts on remove', (done) => {
		joe.delete() // must be an instance model delete to trigger middleware
			.then(() => BlogPost.countDocuments())
			.then((count) => {
				assert(count === 0);
				done();
			});
	});
});
