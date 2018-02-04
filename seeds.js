var User = require('./models/user');

var data = [
	{
		username: "example1",
		password: "123456"
	},
	{
		username: "example2",
		password: "123456"
	},
	{
		username: "example3",
		password: "123456"
	}
];

function seedDB() {
	// Clear all User entries
	User.remove({}, function (err) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("Users Removed!");
			data.forEach(function (seed) {
				User.create(seed, function (err, newUser) {
					if (err) {
						console.log(err);
					}
					else {
						console.log(newUser);
					}
				});
			});
		}
	});
}

module.exports = seedDB;
