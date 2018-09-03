var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

/* GET contact page. */
router.get('/', function (req, res, next) {
  res.render('gravimetric_values', { title: '/gravimetric_values' });
});

router.get('/country', function (req, res, next) {
  MongoClient.connect(url, function (err, client) {
    console.log("using MongoDB");
    let db = client.db('gravimetricValues');
    let collection = db.collection('bases');
    collection.find({ "country": "Canada" }).toArray(function (err, bases) {
      console.log(bases);
      console.log (typeof(bases));
      client.close();
      res.render('gravimetric_values', { title: '/gravimetric_values', baseInformation: bases });

    });
  });
});


module.exports = router;