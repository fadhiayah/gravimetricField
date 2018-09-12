var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('official_websites', { title: '/home' });
});

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017';

router.post("/continent", function (request, response, next) {
  console.log('in backend');
  console.log(request.body);



  MongoClient.connect(url, function (error, client) {
    console.log("Conectados a MongoDB");
    let dbo = client.db('website');

    dbo.collection("linksW").find({ Continent: request.body.valueSelected }).toArray(function (err, links) {
      console.log("no sale nada");
      ///console.log(links);
      console.log(links[0].website);
      console.log (links[0].Country);

      client.close();
    let leng = links.length;
    console.log (leng);
    let cities = [];
    let websites = [];

    for (let i = 0; i <= (leng - 1); i += 1) {
      
      let c = links[i].Country;
      let w = links[i].website;
      
      cities.push(c);
      websites.push(w);

    }
 console.log (cities);
 console.log (websites);



      let resLinks = {
         city : cities,
         sites : websites
      }

      console.log(resLinks);

      response.send(resLinks);
      
    });
  });

});





module.exports = router;