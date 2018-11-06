var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var multer   = require('multer');
var moment   = require('moment');
var User     = require('../models/user');
var Course   = require('../models/course');
var path = require('path');

/**
 * Multer Setup
 */

const absolutePath = path.join(__dirname, '/public/uploads');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, absolutePath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})
var upload = multer({ storage: storage })

/**
 * ADMIN ROUTES
 */

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

// router.get('/register', (req, res) => {
//   res.render('admin/register')
// })

// router.post('/register', (req, res) => {
//   const newUser = new User({username: req.body.user.username})
//   User.register(newUser, req.body.user.password, (err, success) => {
//     if (err){
//       console.log(err);
//       req.flash("error", "Erro ao criar o administrador.")
//       res.render("admin/register");
//     }
//     else {
//       passport.authenticate('local')(req, res, () => {
//         req.flash("success", "Admin criado com sucesso!")
//         res.redirect("admin/login");
//       })
//     }
//   })
// })

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
// INDEX COURSE ROUTE
router.get('/courses', isLoggedIn, function(req, res){
  Course.find({}).sort({'updated_at': -1}).exec(function(err, results) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("admin/courses/index", {courses: results});
    }
  });
});

// NEW COURSE ROUTE
router.get('/courses/new', isLoggedIn, function (req,res) {
  res.render('admin/courses/new');
});

// CREATE COURSE ROUTE
router.post('/courses', isLoggedIn, upload.single('imageFile'), function(req, res) {
  req.body.course.description = req.sanitize(req.body.course.description);
  req.body.course.price       = parseFloat(req.body.course.price);
  req.body.course.date        = moment.utc(req.body.course.date, "DD/MM/YYYY HH:mm");
  req.body.course.image       = req.file.filename;
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

// SHOW COURSE ROUTE
router.get('/courses/:id', isLoggedIn, function(req,res) {
  Course.findById(req.params.id).exec(function(err, course) {
    if (err) {
      console.log(err);
      req.flash("error", "Não foi possível encontrar o curso.");
      res.redirect("/admin/courses");
    }
    else {
      if (course)
        res.render("admin/courses/show", {course: course});
      else {
        req.flash("error", "Não foi possível encontrar o curso.");
        res.redirect("/admin/courses");
      }
    }
  });
});

// EDIT COURSE ROUTE
router.get('/courses/:id/edit', isLoggedIn, upload.single('imageFile'), function(req,res) {
  Course.findById(req.params.id).exec(function(err, course) {
    if (err) {
      console.log(err);
      req.flash("error", "Não foi possível encontrar o curso.");
      res.redirect("/admin/courses");
    }
    else {
      res.render("admin/courses/edit", {course: course});
    }
  });
});

// UPDATE COURSE ROUTE
router.put('/courses/:id', isLoggedIn, upload.single('imageFile'), function(req, res) {
  req.body.course.description = req.sanitize(req.body.course.description);
  req.body.course.price       = parseFloat(req.body.course.price);
  req.body.course.date        = moment.utc(req.body.course.date, "DD/MM/YYYY HH:mm");
  console.log(req.file);
  if (req.file !== undefined)
    req.body.course.image = req.file.filename;
  Course.findByIdAndUpdate(req.params.id, req.body.course, function(err, course) {
    if (err) {
      console.log(err);
      req.flash("error", "Não foi possível atualizar o curso.");
      res.redirect("/admin/courses");
    }
    else {
      req.flash("success", "Curso atualizado com sucesso!")
      res.redirect("/admin/courses/" + req.params.id);
    }
  });
})

// DESTROY COURSE ROUTE
router.delete('/courses/:id', isLoggedIn, function(req, res) {
  Course.findByIdAndRemove(req.params.id, function(err, course) {
    if (err) {
      console.log(err);
      req.flash("error", "Não foi possível deletar o curso.");
      res.redirect("/admin/courses");
    }
    else {
      req.flash("success", "Curso deletado com sucesso!")
      res.redirect("/admin/courses");
    }
  });
})

/**
 * Auth Function
 */
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "É preciso estar logado para acessar essa sessão.");
  res.redirect('/admin/login');
}

module.exports = router;
