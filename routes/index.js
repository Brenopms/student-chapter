var express  = require('express');
var router   = express.Router();
var Course   = require('../models/course');

//==============
// INDEX ROUTES
//==============

/**
 * MAIN PAGE
 */

// Home Page
router.get('/', function(req,res){
	Course.find({}).sort({'date': -1}).limit(3).exec(function(err, results) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("index", {courses: results});
		}
	});
});

module.exports = router;
