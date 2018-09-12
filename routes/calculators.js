const express = require('express');
const router = express.Router();
const sta = require('simple-statistics');
let papaparse = require ('papaparse');

/* GET contact page. */
router.get('/', function (req, res, next) {
    res.render('calculators', { title: '/calculators' });
});
//para conversions 


/*//prueba funciona
router.post ("/prueba",function(request,response,next){
    console.log('in backend');
    let resp = {
        resultado: request.body.name *5, 
        comentario : "resultado de la formula"    
    }
    //console.log (request)
    console.log (request.body);
   console.log (request.body.name);
   //console.log (resp)
    response.send (resp);
});*/


//----- Coordenate conversion -----//
router.post("/coordenate_conversion", function (request, response, next) {
    console.log('in backend');

    const convertions = function (degree, minute, second) {

        if (degree > 0) {
            let change = Math.abs((degree) + (minute / 60) + (second / 3600));
            return change;
        }
        else {
            let change = (-1) * Math.abs((Math.abs(degree)) + (minute / 60) + (second / 3600));
            return change;
        }
    };

    let latCoor = convertions(parseInt(request.body.degreeLat), parseInt(request.body.minuteLat), parseInt(request.body.secondLat));


    let lonCoor = convertions(parseInt(request.body.degreeLon), parseInt(request.body.minuteLon), parseInt(request.body.secondLon));

    let res = {
        decimalLat: latCoor,
        decimalLon: lonCoor
    }

    console.log(res);

    console.log('lat : ' + res.decimalLat);
    console.log('Long : ' + res.decimalLon);
    response.send(res);

});

// ----- Basic data analyst -----//
router.post("/data_analyst", function (request, response, next) {
    console.log('in backend');
    console.log(request.body);
    console.log(request.body.data_to_analyze)
    console.log(typeof (request.body.data_to_analyze));
    let stringDA = request.body.data_to_analyze;
    let stringDAToArray = stringDA.split(",").map(Number);
    console.log(stringDAToArray);
    console.log(typeof (stringDAToArray));
    
    const minValue = sta.min(stringDAToArray);
    const maxValue = sta.max(stringDAToArray);
    const meanValue = sta.mean(stringDAToArray);
    const modeValue = sta.mode(stringDAToArray);
    const medianValue = sta.median(stringDAToArray);
    const varianceValue = sta.variance(stringDAToArray);
    const standarDeviValue = sta.standardDeviation(stringDAToArray);

    let resDA = {
        minValue: minValue,
        maxValue: maxValue,
        meanValue: meanValue,
        modeValue: modeValue,
        medianValue: medianValue,
        varianceValue: varianceValue,
        standardDeviation: standarDeviValue
    };

    console.log(resDA);
    response.send(resDA);

});


router.post("/bouguer", function (request, response, next) {
    console.log('in backend');
    console.log(request.body);
    console.log (request.body.data_bouguer);
    console.log(typeof(request.body.data_bouguer));
    let dataBAString = request.body.data_bouguer;
    //console.log (dataBAString);
    //console.log (typeof(dataBAString));
    let dataBAObject = papaparse.parse(dataBAString,{header:true}).data;
    console.log(dataBAObject);
    console.log(typeof(dataBAObject));
   // console.log (dataBAObject[0].g*5);
   let leng = dataBAObject.length;
   console.log('LENG = ' + (leng - 1));
   let bouguerAnomaly = [];
   let axisX = [];
   let axisY = [];

   for (let i = 0; i <= (leng - 1); i += 1) {

    let x = parseInt(dataBAObject[i].x);
    let y = parseInt(dataBAObject[i].y);
    let z = parseInt(dataBAObject[i].z);
    let g = parseInt(dataBAObject[i].g);

    //console.log('x= ' + x, 'y= ' + y, 'z= ' + z, 'g= ' + g);

    const ref = 0;
    const density = 2.67;
    const ge = 978032.67715;
    const k = 0.001931851353;
    const e2 = 0.0066943800229;

    //console.log('ref= ' + ref, 'density= ' + density, 'ge= ' + ge, 'k =' + k, 'e2 = ' + e2);

    // Converts from degrees to radians.
    Math.radians = function (degrees) {
        return degrees * Math.PI / 180;
    };

    // Converts from radians to degrees.
    Math.degrees = function (radians) {
        return radians * 180 / Math.PI;
    };

    // Converts latitud in radian values  

    let latEnRadians = Math.radians(y);
    //console.log('Radians = ' + latEnRadians, 'Degrees =' + y);

    // Theory gravity 

    let gT = (ge * (1 + (k * Math.pow(Math.sin(latEnRadians), 2)))) /
        Math.sqrt((1 - (e2 * Math.pow(Math.sin(latEnRadians), 2))));

    //console.log('Theory grav = ' + gT);

    // Bouguer correction

    let bC = (0.04191 * density * z);

    //console.log('Bouguer correction = ' + bC);

    // latitud correction 

    let lC = (0.3086 * z);

    //console.log('Latitud correction = ' + lC);

    // Simple Bouguer anomaly

    let aB = g + lC - bC - gT;
    //console.log("Simple Bouguer anamoly = " + aB);

    bouguerAnomaly.push (aB);
    //console.log (BouguerAnomaly);
    axisX.push (x);
    axisY.push (y);
  
}

console.log ('este es el array respuesta : ' + bouguerAnomaly);
console.log (bouguerAnomaly.length);
console.log ('ejex : ' +axisX);
console.log ('ejeY : '+ axisY);
   


    let resBA = {
        anomalyValue: bouguerAnomaly,
        axisX : axisX,
        axisY :axisY
    };

    console.log(resBA);
    response.send(resBA);



});




module.exports = router;