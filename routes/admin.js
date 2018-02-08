var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var User     = require('../models/user');
var Course   = require('../models/course');

/**
 * ADMIN ROUTES
 */

// Sign Up Form
// router.get('/register', function (req, res) {
//   res.render('register');
// });

// Sign Up Logic Handling
// router.post('/register', function (req, res) {
// 	var newUser = new User({username: req.body.username});
// 	User.register(newUser, req.body.password, function(err, user) {
// 		if (err) {
// 			console.log(err);
// 			return res.render("register");
// 		}
// 		passport.authenticate("local")(req, res, function() {
// 			res.redirect('/');
// 		});
// 	});
// });

// Dashboard Index
router.get('/', isLoggedIn, function (req, res) {
	res.redirect('/admin/courses/');
});

// Login Form
router.get('/login', function (req, res) {
	if(req.isAuthenticated()){
		res.redirect('/admin');
	}
	else {
		res.render('admin/login');
	}
});

// Login Logic Handling
router.post('/login', passport.authenticate('local', {
	successRedirect: '/admin',
	failureRedirect: '/admin/login',
	successFlash: 'Seja bem vindo!',
	failureFlash: 'Usuário ou senha inválidos.'
}), function (req, res) {});

// Logout Logic Handling
router.get('/logout', function(req, res) {
	req.logout();
	req.flash("info", "A sessão foi encerrada.")
	res.redirect('/');
});

/**
 * COURSE ROUTES
 */
// INDEX ROUTE
router.get('/courses', isLoggedIn, function(req, res){
	Course.find({}).sort({'date': -1}).exec(function(err, results) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("admin/courses/index", {courses: results});
		}
	});
});

// NEW ROUTE
router.get('/courses/new', isLoggedIn, function (req,res) {
	res.render('admin/courses/new');
});

// CREATE ROUTE
router.post('/courses', isLoggedIn, function(req, res) {
	req.body.course.description = req.sanitize(req.body.course.description);
	req.body.course.price = parseFloat(req.body.course.price);
	req.body.course.image = "https://image.freepik.com/free-vector/money-in-exchange-for-an-idea_23-2147492044.jpg";
	Course.create(req.body.course, function(err, newCourse) {
		if (err){
			console.log(err);
			req.flash("error", "Erro ao criar o curso. Por favor, tente novamente.")
			res.render("admin/courses/new");
		}
		else {
			req.flash("success", "Curso criado com sucesso!")
			res.redirect("/admin/courses");
		}
	});
});

// SHOW ROUTE
router.get('/courses/:id', isLoggedIn, function(req,res) {
	Course.findById(req.params.id).exec(function(err, course) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("courses/show", {course: course});
		}
	});
});

/**
 * Auth Function
 */
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/admin/login');
}

module.exports = router;
