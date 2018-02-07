var nodemailer = require('nodemailer');
var express    = require('express');
var router     = express.Router();

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

//===================
// CONTACT ROUTES
//===================

// INDEX ROUTE
router.get('/', function(req, res){
  res.render('contact/index')
});

// SEND MESSAGE ROUTE
router.post('/', function(req, res) {
  var contact = req.body.contact;
  const mailOptions = {
    from:    'ufmgstudentchapter@gmail.com',
    to:      contact["email"],
    subject: 'Nova Mensagem de ' + contact["name"],
    html:    '<p>Nome: ' + contact["name"] + '</p>' +
      '<p>E-mail: ' + contact["email"] + ' </p>' +
      '<p>Mensagem: ' + contact["message"] + ' </p>'
  };
  transporter.sendMail(mailOptions, function (err, info) {
     if(err) {
       console.log(err)
       res.render("contact/index");
     }
     else {
       console.log(info);
       res.redirect("/");
     }
  });
});

module.exports = router;
