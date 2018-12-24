const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
mongoose.connection
	.once('open', () => console.log("Connected to \"users_test\" mongo database"))
	.on('error', (error) => {
		console.warn('Warning', error)
	});