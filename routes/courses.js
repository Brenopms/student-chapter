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

// SHOW ROUTE
router.get('/:id', function(req,res) {
	Course.findById(req.params.id, function(err, course) {
		if (err) {
			console.log(err);
			req.flash("error", "Não foi possível encontrar o curso.");
      res.redirect("/");
		}
		else {
			if (course)
        res.render("courses/show", {course: course});
      else {
        req.flash("error", "Não foi possível encontrar o curso.");
        res.redirect("/courses");
      }
		}
	});
});

module.exports = router;
