const assert = require('assert');

const User = require('../src/user.js');

describe("Creating records", () => {
	it("saves a user", (done) => {
		const joe = new User({name: "Joe"});
		joe.save() // put joe into database
			.then(() => {
				// Has joe been saved successfully?
				assert(joe.isNew === false);
				done();
			});
	});
});