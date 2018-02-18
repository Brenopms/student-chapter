var User = require('./models/user');
var Course = require('./models/course');

var userData = [
	{
		username: "teste",
		password: "123456"
	}
];

var courseData = [
	{
		name: "Dummy Course 1",
		image: "1518137364920-money-in-exchange-for-an-idea_23-2147492044.jpg",
		description: "Random Description for our Dummy Course",
		date: new Date(),
		price: 50.0,
		duration: "6 horas e 30 minutos",
		address: "Rua Rio de Janeiro, 1288, Bairro Lourdes",
		formLink: "https://goo.gl/forms/WGtqyPgs0mas8gNt2"
	},
	{
		name: "Dummy Course 2",
		image: "1518137364920-money-in-exchange-for-an-idea_23-2147492044.jpg",
		description: "Random Description for our Dummy Course",
		date: new Date(),
		price: 50.0,
		duration: "6 horas e 30 minutos",
		address: "Rua Rio de Janeiro, 1288, Bairro Lourdes",
		formLink: "https://goo.gl/forms/WGtqyPgs0mas8gNt2"
	},
	{
		name: "Dummy Course 3",
		image: "1518137364920-money-in-exchange-for-an-idea_23-2147492044.jpg",
		description: "Random Description for our Dummy Course",
		date: new Date(),
		price: 50.0,
		duration: "6 horas e 30 minutos",
		address: "Rua Rio de Janeiro, 1288, Bairro Lourdes",
		formLink: "https://goo.gl/forms/WGtqyPgs0mas8gNt2"
	},
	{
		name: "Dummy Course 4",
		image: "1518137364920-money-in-exchange-for-an-idea_23-2147492044.jpg",
		description: "Random Description for our Dummy Course",
		date: new Date(),
		price: 50.0,
		duration: "6 horas e 30 minutos",
		address: "Rua Rio de Janeiro, 1288, Bairro Lourdes",
		formLink: "https://goo.gl/forms/WGtqyPgs0mas8gNt2"
	},
	{
		name: "Dummy Course 5",
		image: "1518137364920-money-in-exchange-for-an-idea_23-2147492044.jpg",
		description: "Random Description for our Dummy Course",
		date: new Date(),
		price: 50.0,
		duration: "6 horas e 30 minutos",
		address: "Rua Rio de Janeiro, 1288, Bairro Lourdes",
		formLink: "https://goo.gl/forms/WGtqyPgs0mas8gNt2"
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
				User.register(new User({username: seed.username}), seed.password, function(err, newUser) {
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
			console.log("Courses Removed!");
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
