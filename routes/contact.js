var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');


/* GET contact page. */
router.get('/', function (req, res, next) {
  res.render('contact', { title: '/contact' });
});

router.get('/email', function (req, res, next) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gravimetricfield@gmail.com",
      pass: "gravimetric10"
    }
  });
  mailOpts = {
    from: "gravimetricfield@gmail.com",
    to: "gravimetricfield@gmail.com",
    subject: (`Contact's email, User :  ${req.query.name} ${req.query.last_name} `),
    text: (` We got a message from : ${req.query.name} ${req.query.last_name} (${req.query.email})
    Country :  ${req.query.country} 
    Institution :  ${req.query.institution} 
    Message : ${req.query.message}`)
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
     res.render('error')
    }
    else {
      res.render('email');
    }
  });


});





module.exports = router;