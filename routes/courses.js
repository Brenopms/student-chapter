var express = require('express');
var router  = express.Router();
var Course  = require('../models/course');

//===================
// COURSES ROUTES
//===================

// INDEX ROUTE
router.get('/', function(req, res){
	Course.find({}).sort({'date': -1}).exec(function(err, results) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("courses/index", {courses: results});
		}
	});
});

// NEW ROUTE
router.get('/new', isLoggedIn, function (req,res) {
	res.render('courses/new');
});

// CREATE ROUTE
router.post('/', isLoggedIn, function(req, res) {
	req.body.course.description = req.sanitize(req.body.course.description);
	Course.create(req.body.course, function(err, newCourse) {
		if (err){
			res.render("courses/new");
		}
		else {
			newCourse.save();
			res.redirect("/courses");
		}
	});
});

// SHOW ROUTE
router.get('/:id', function(req,res) {
	Course.findById(req.params.id, function(err, course) {
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
	res.redirect('/login');
}

module.exports = router;
