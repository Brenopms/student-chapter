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
    to:      'ufmgstudentchapter@gmail.com',
    subject: contact["subject"],
    html:    '<p>Nome: ' + contact["name"] + '</p>' +
      '<p>E-mail: ' + contact["email"] + ' </p>' +
      '<p>Mensagem: ' + contact["message"] + ' </p>'
  };
  transporter.sendMail(mailOptions, function (err, info) {
     if(err) {
       console.log(err)
       req.flash("error", "Erro ao enviar a mensagem. Por favor, tente novamente.")
       res.render("contact/index");
     }
     else {
       console.log(info);
       req.flash("success", "Mensagem enviada com sucesso! Em breve nossa equipe entrará em contato com você!");
       res.redirect("/");
     }
  });
});

module.exports = router;
