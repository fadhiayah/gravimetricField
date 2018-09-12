var express = require('express');
var router = express.Router();


/* GET contact page. */
router.get('/', function (req, res, next) {
  res.render('gravimetric_values', { title: '/gravimetric_values' });
});

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

router.post("/country", function (request, response, next) {
  console.log('in backend');
  console.log(request.body);



  MongoClient.connect(url, function (error, client) {
    console.log("Conectados a MongoDB");
    let dbo = client.db("gravimetricValues");

    dbo.collection("bases").find({ country: request.body.valueSelected }).toArray(function (err, bases) {

      console.log(bases[0].city);
      //console.log (links[0].Country);

      client.close();
      let leng = bases.length;
      console.log(leng);
      let cities = [];
      //let websites = [];

      for (let i = 0; i <= (leng - 1); i += 1) {

        let c = bases[i].city;
        if (cities.indexOf(c) === -1) {
          cities.push(c);
        }
      }
      console.log(cities);
      //console.log (websites);



      let resLinks = {
        city: cities,
        //sites : websites
      }

      console.log(resLinks);

      response.send(resLinks);

    });
  });

});

router.post("/province", function (request, response, next) {
  console.log('in backend');
  console.log(request.body);



  MongoClient.connect(url, function (error, client) {
    console.log("Conectados a MongoDB");
    let dbo2 = client.db("gravimetricValues");

    dbo2.collection("bases").find({ city: request.body.valuePSelected }).toArray(function (err, bases) {
      
      console.log(bases[0].name_base);
      
     

      client.close();
      let leng = bases.length;
      console.log(leng);
      let name_bases = [];
     

      for (let i = 0; i <= (leng - 1); i += 1) {

        let n = bases[i].name_base;
        if (name_bases.indexOf(n) === -1) {
          name_bases.push(n);
        }
      }
      let resNB = {
        nameBase: name_bases,
      }

      console.log(resNB);
      response.send(resNB);

    });
  });

});

router.post("/base", function (request, response, next) {
  console.log('in backend');
  console.log(request.body);

  MongoClient.connect(url, function (error, client) {
    console.log("Conectados a MongoDB");
    let dbo3 = client.db("gravimetricValues");

    dbo3.collection("bases").find({ name_base: request.body.valueBSelected }).toArray(function (err, bases) {
      client.close();
      let resIB = {
        long: bases[0].long,
        lat : bases[0].lat,
        valueG : bases[0].gravity_values,
        name : bases[0].name_base,
        pdf : bases[0].pdf_name
      }

      console.log(resIB);
      response.send(resIB);

    });
  });

}); 



module.exports = router;