const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Use ES6 promises

before((done) => {
	mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
	mongoose.connection
		.once('open', () => {
			console.log("Successfully connected to database; Initialization complete");
			console.log("Starting tests ...");
			done(); // Make sure connection occurs before tests run 
		})
		.on('error', (error) => {
			console.warn('Warning', error);
			process.exit(-1);
		});
});

beforeEach((done) => {
	const { users, comments, blogposts } = mongoose.connection.collections;
	if (users) {
		users.drop(() => {
			if (comments) {
				comments.drop(() => {
					if (blogposts) {
						blogposts.drop(() => {
							done();
						});	
					} else {
						done();
					}
				});
			} else {
				done();
			}
		});
	} else {
		done();
	}
});

after((done) => {
	console.log("Tests complete");
	done();
})