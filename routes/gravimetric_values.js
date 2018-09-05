var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

/* GET contact page. */
router.get('/', function (req, res, next) {
  res.render('gravimetric_values', { title: '/gravimetric_values' });
});


//prueba funciona
router.post ("/country",function(request,response,next){
    console.log('in backend');

    console.log (request.body);
    console.log (request.body.valueSelected);
    
    MongoClient.connect(url, function (err, client) {
      console.log("using MongoDB");
      let dbo = client.db('gravimetricValues');
      //let collection = dbo.collection('bases');
      //let query = { city : /^Sas/};
      //let sort = { city: 0 };
      dbo.collection("pr").find({} , {_id:0, x:1,y:1}).toArray(function (err, bases) {
        console.log( bases);
        //console.log (typeof(bases));
        //console.log (bases[1].city);
        client.close();
        //res.render('gravimetric_values', { title: '/gravimetric_values', baseInformation: bases });
  
      });
    });



    //let resp = {
      //  resultado: request.body.name *5, 
        //comentario : "resultado de la formula"    
    //}
   //console.log (resp)
    //response.send (resp);
});



/*router.get('/country', function (req, res, next) {
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
});*/



module.exports = router;