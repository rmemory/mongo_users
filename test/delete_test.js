const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		joe.save()
		.then(() => done());
	});
	
	it('find by id then delete', (done) => {
		const id = joe._id;

		User.findById(id)
		.then((user) => User.deleteOne(user)
		.then(() => User.findOne({_id: id}))
		.then((user) => {
			assert(user === null);
			done();
		}));
	});
	
	it('deleteOne test', (done) => {
		// Remove a bunch of records with some given criteria
		User.findOneAndDelete({ name: 'Joe' })
		.then(() => User.findOne({ name: 'Joe' }))
		.then((user) => {
			assert(user === null);
			done();
		  });
	});
	
	it('class method findOneAndDelete', (done) => {
		User.findOneAndDelete({ name: 'Joe' })
		.then(() => User.findOne({ name: 'Joe' }))
		.then((user) => {
			assert(user === null);
			done();
		  });
	});
});