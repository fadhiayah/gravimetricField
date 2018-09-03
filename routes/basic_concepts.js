var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('basic_concepts', { title: '/basic_concept' });
});

module.exports = router;