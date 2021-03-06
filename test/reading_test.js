const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
	let joe, maria, alex, zach;

	beforeEach((done) => {
		alex = new User({ name: 'Alex' });
		joe = new User({ name: 'Joe' });
		maria = new User({ name: 'Maria' });
		zach = new User({ name: 'Zach' });
	
		Promise.all([joe.save(), alex.save(), maria.save(), zach.save()])
		.then(() => done());
	});

	it('finds all users with a name of joe', (done) => {
		User.find({ name: 'Joe' })
		.then((users) => { // users is an array
			// must call toString to get the value of the id
			assert(users[0]._id.toString() === joe._id.toString());
			done();
		});
	});
	
	it('find a user with a particular id', (done) => {
		User.findOne({ _id: joe._id })
		.then((user) => {
			assert(user);
			assert(user.name === 'Joe');
			done();
		});
	});
	
	// good for pagination
	it('can skip and limit the result set', (done) => {
		User.find({})
		.sort({ name: 1 }) // sort results alphabetically according to name, ascending. descending would be negative 1
		.skip(1) // Skip the first user, in this case Alex
		.limit(2) // Limit the number of results from query (only including joe and maria, not including Zach)
		.then((users) => {
			assert(users.length === 2);
			//without the sort operation, this result isn't guaranteed
			assert(users[0].name === 'Joe');
			assert(users[1].name === 'Maria');
			done();
		});
	});
});
