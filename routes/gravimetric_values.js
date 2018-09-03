var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('gravimetric_values', { title: '/gravimetric_values' });
});

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
});

module.exports = router;