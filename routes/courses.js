var express = require('express');
var router  = express.Router();
var Course  = require('../models/course');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');

/**
 * Nodemailer Configuration
 */
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ufmgstudentchapter@gmail.com',
    pass: 'Ronaldo1.'
  }
});
var options = {
    viewEngine: {
        extname: '.handlebars',
        helpers: require("../public/js/helpers.js").helpers,
        layoutsDir: 'views/email/',
        defaultLayout : 'template',
        partialsDir : 'views/partials/'
    },
    viewPath: 'views/email/',
    extName: '.handlebars'
};
transporter.use('compile', hbs(options));

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

//
router.post('/:id/reserve', function(req,res) {
  Course.findById(req.params.id, function(err, course) {
    if (err) {
      console.log(err);
      req.flash("error", "Não foi possível encontrar o curso.");
      res.redirect("/");
    }
    else {
      if (course) {
        var reserve = req.body.reserve;
        transporter.sendMail({
            from: 'ufmgstudentchapter@gmail.com',
            to: reserve["email"],
            subject: 'Interesse no Curso ' + course["name"],
            template: 'new.reserve',
            context: {
                 name  : reserve["name"],
                 price : reserve["quantity"] * course["price"],
                 formLink : course["formLink"]
            }
        }, function (err, info) {
           if(err) {
             console.log(err)
             req.flash("error", "Erro ao enviar a reserva. Por favor, tente novamente.")
             res.redirect("/courses/" + req.params.id);
           }
           else {
             console.log(info);
             req.flash("success", "Reserva enviada com sucesso! Por favor, verifique sua caixa de entrada!");
             res.redirect("/");
           }
        });
      }
      else {
        req.flash("error", "Não foi possível encontrar o curso.");
        res.redirect("/courses");
      }
    }
  });
});

module.exports = router;
