var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('official_websites', { title: '/home' });
});

module.exports = router;