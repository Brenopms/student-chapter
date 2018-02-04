var User = require('./models/user');
var Course = require('./models/course');

var userData = [
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

var courseData = [
	{
		name: "Dummy Course 1",
		image: "http://oddculture.com/wp-content/uploads/2015/12/Camping-Near-The-Lake-Background-Wallpaper.jpg",
		description: "Random Description for our Dummy Course",
		date: new Date(),
		price: 50.0,
		address: "Rua Rio de Janeiro, 1288, Bairro Lourdes"
	},
	{
		name: "Dummy Course 2",
		image: "http://oddculture.com/wp-content/uploads/2015/12/Camping-Near-The-Lake-Background-Wallpaper.jpg",
		description: "Random Description for our Dummy Course",
		date: new Date(),
		price: 50.0,
		address: "Rua Rio de Janeiro, 1288, Bairro Lourdes"
	},
	{
		name: "Dummy Course 3",
		image: "http://oddculture.com/wp-content/uploads/2015/12/Camping-Near-The-Lake-Background-Wallpaper.jpg",
		description: "Random Description for our Dummy Course",
		date: new Date(),
		price: 50.0,
		address: "Rua Rio de Janeiro, 1288, Bairro Lourdes"
	},
	{
		name: "Dummy Course 4",
		image: "http://oddculture.com/wp-content/uploads/2015/12/Camping-Near-The-Lake-Background-Wallpaper.jpg",
		description: "Random Description for our Dummy Course",
		date: new Date(),
		price: 50.0,
		address: "Rua Rio de Janeiro, 1288, Bairro Lourdes"
	},
	{
		name: "Dummy Course 5",
		image: "http://oddculture.com/wp-content/uploads/2015/12/Camping-Near-The-Lake-Background-Wallpaper.jpg",
		description: "Random Description for our Dummy Course",
		date: new Date(),
		price: 50.0,
		address: "Rua Rio de Janeiro, 1288, Bairro Lourdes"
	},
];

function seedDB() {
	// Clear all User entries
	User.remove({}, function (err) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("Users Removed!");
			userData.forEach(function (seed) {
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
	// Clear all Courses entries
	Course.remove({}, function (err) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("Users Removed!");
			courseData.forEach(function (seed) {
				Course.create(seed, function (err, newCourse) {
					if (err) {
						console.log(err);
					}
					else {
						console.log(newCourse);
					}
				});
			});
		}
	});
}

module.exports = seedDB;
