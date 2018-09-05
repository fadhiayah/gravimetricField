window.onload = function () {
    console.log('loaded site')


    /* // prueba de fetch y funciona 
     const prueba = document.getElementById('submit');
     console.log(prueba);
     prueba.addEventListener('click', function () {
         const url = 'http://localhost:3000/calculators/prueba';
         let data_envio = {
             name: document.getElementById('nombre').value
         }
         let json_data_envio = JSON.stringify(data_envio);
         console.log("json: " + json_data_envio);
     
         var request = new Request(url, {
             method: 'POST',
             body: json_data_envio,
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
             },
         });
         fetch(request)
             .then(function (respuesta) {
                 // Convertir a JSON
                 console.log('estou en el frontend');
                 console.log(respuesta);
                 return respuesta.json();
             }).then(function (j) {
                 // Ahora 'j' es un objeto JSON
                 console.log(j);
                 document.getElementById('resultado').value = j.resultado;
             });
     
     });*/





    // ----- Coordenate conversions ----- // 
    const input_coordenate = document.getElementById('coordenate_values');
    console.log(input_coordenate);
    input_coordenate.addEventListener('click', function () {

        let degreeLatAllowed = document.getElementById('degreeLat').value;
        let degreeLonAllowed = document.getElementById('degreeLon').value;

        if (degreeLatAllowed > 90 || degreeLatAllowed < -90) {
            window.alert('Degrees Latitude must be in the range of -90 to 90');
        }

        else if (degreeLonAllowed > 180 || degreeLonAllowed < -180) {
            window.alert('Degrees Longitude must be in the range of -180 to 180');
        }

        else {

            const url = 'http://localhost:3000/calculators/coordenate_conversion';
            let data_sent = {
                degreeLat: document.getElementById('degreeLat').value,
                minuteLat: document.getElementById('minuteLat').value,
                secondLat: document.getElementById('secondLat').value,
                degreeLon: document.getElementById('degreeLon').value,
                minuteLon: document.getElementById('minuteLon').value,
                secondLon: document.getElementById('secondLon').value,
            }
            let json_data_sent = JSON.stringify(data_sent);
            console.log("json: " + json_data_sent);
            var request = new Request(url, {
                method: 'POST',
                body: json_data_sent,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            fetch(request)
                .then(function (response) {
                    // Convertir a JSON
                    console.log('in frontend');
                    console.log(response);
                    return response.json();
                }).then(function (json_response) {
                    // Ahora 'j' es un objeto JSON
                    console.log(json_response);
                    document.getElementById('decimalLat').value = json_response.decimalLat;
                    document.getElementById('decimalLon').value = json_response.decimalLon;
                });
        }

    });


    // ----- Basic data analyst -----//

    //----Validation input -----//

    let csvInputAS = document.getElementById('file_data_analyst');
    console.log(csvInputAS);
    csvInputAS.addEventListener('change', function (e) {

        let allFiles = e.target.files;
        console.log(allFiles);
        let fileSelect = allFiles[0];
        console.log(fileSelect);
        let filePath = csvInputAS.value;
        console.log(filePath);
        let extAllowed = /(.csv)$/i;

        if (!extAllowed.exec(filePath)) {

            window.alert('Plesea be sure to choose a .csv file :) ');
            csvInputAS.value = '';
            return false;
        }
        else {
            let reader = new FileReader();
            reader.readAsText(fileSelect);
            reader.addEventListener('load', function (e) {

                let fileContent = e.target.result;
                console.log(fileContent);
                console.log(typeof (fileContent));
                let fileArray = fileContent.split(",").map(Number);
                console.log(fileArray);
                console.log(typeof (fileArray));
                // File content 
                for (i = 0; i <= fileArray.length - 1; i += 1) {
                    let value = fileArray[i];
                    if (value == 0 || value == '') {
                        window.alert('Please be sure that your file does not have values as 0 or empty');
                        csvInputAS.value = '';
                        break;
                    }
                }

                const data_analyst_values = document.getElementById('data_analyst_values');
                console.log(data_analyst_values);
                data_analyst_values.addEventListener('click', function () {

                    if (csvInputAS.value === "") {
                        window.alert('Please select a file');
                    }
                    else {
                        /*window.alert(fileArray);*/
                        const url = 'http://localhost:3000/calculators/data_analyst';
                        let data_sentDA = {
                            data_to_analyze: fileContent,
                        };
                        let json_data_sentDA = JSON.stringify(data_sentDA);
                        console.log("json: " + json_data_sentDA);

                        console.log(json_data_sentDA);
                        console.log(typeof (json_data_sentDA));
                        console.log(json_data_sentDA.length);

                        var request = new Request(url, {
                            method: 'POST',
                            body: json_data_sentDA,
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                        });

                        fetch(request)
                            .then(function (responseDA) {
                                // Convertir a JSON
                                console.log('in frontend');
                                console.log(responseDA);
                                return responseDA.json();
                            }).then(function (json_responseDA) {
                                // Ahora 'j' es un objeto JSON
                                console.log(json_responseDA);
                                let ulDa = document.getElementById('res_analyst');
                                ulDa.innerHTML = ("  Statistical values :");
                                let liMin = document.createElement("li")
                                liMin.innerHTML = ('Minimum value : ' + json_responseDA.minValue);
                                let liMean = document.createElement("li")
                                liMean.innerHTML = ('Mean value : ' + json_responseDA.meanValue);
                                let liMode = document.createElement("li")
                                liMode.innerHTML = ('Mode value : ' + json_responseDA.modeValue);
                                let liMe = document.createElement("li")
                                liMe.innerHTML = ('Median value : ' + json_responseDA.medianValue);
                                let liD = document.createElement("li")
                                liD.innerHTML = ('Deviation value : ' + json_responseDA.standardDeviation);
                                let liV = document.createElement("li")
                                liV.innerHTML = ('Variance value : ' + json_responseDA.varianceValue);
                                let liMax = document.createElement("li")
                                liMax.innerHTML = ('Maximum value : ' + json_responseDA.maxValue);


                                ulDa.appendChild(liMin);
                                ulDa.appendChild(liMean);
                                ulDa.appendChild(liMode);
                                ulDa.appendChild(liMe);
                                ulDa.appendChild(liD);
                                ulDa.appendChild(liV);
                                ulDa.appendChild(liMax);


                                /*let liMean = document.createElement ("li")
                                liMean.innerHTML =('Mean Value : '+ json_responseDA.meanValue);
                                ulDa.appendChild(liMean);*/


                                //let p = document.getElementById('res_analyst');
                                //console.log(p);
                                //p.innerHTML = json_responseDA.minValue;

                            });
                        console.log('lo que metere al grafico :' + fileArray);
                        console.log('typeoff' + typeof (fileArray));


                        let resultDA = document.getElementById('chart_divDA');
                        var data = [
                            {
                                y: fileArray,
                                boxpoints: 'all',
                                jitter: 0.3,
                                pointpos: -1.8,
                                type: 'box',
                                name: "Data",
                                marker: { color: "rgb(51, 153, 255)" }
                            }
                        ];

                        var layout = {
                            title: "Box Plot"
                        }

                        Plotly.newPlot(resultDA, data, layout);

                    }
                });
            });
        }
    });


    //---- Bouguer Anomaly ---//

    let csvInputAB = document.getElementById('file_data_bouguer');
    console.log(csvInputAB);
    csvInputAB.addEventListener('change', function (e) {

        let allFiles = e.target.files;
        console.log(allFiles);
        let fileSelect = allFiles[0];
        console.log(fileSelect);
        let filePath = csvInputAB.value;
        console.log(filePath);
        let extAllowed = /(.csv)$/i;

        if (!extAllowed.exec(filePath)) {

            window.alert('Plesea be sure to choose a .csv file :) ');
            csvInputAB.value = '';
            return false;
        }
        else {
            let reader = new FileReader();
            reader.readAsText(fileSelect);
            reader.addEventListener('load', function (e) {

                let fileContent = e.target.result;
                console.log(fileContent);
                console.log(typeof (fileContent));
                let fileArray = fileContent.split(",");
                console.log(fileArray);
                console.log(typeof (fileArray));
                // File content 
                for (i = 0; i <= fileArray.length - 1; i += 1) {
                    let value = fileArray[i];
                    if (value == "0" || value == '') {
                        window.alert('Please be sure that your file does not have values as 0 or empty');
                        csvInputAB.value = '';
                        break;
                    }
                }


                const bouguer_values = document.getElementById('bouguer_values');
                console.log(bouguer_values);
                bouguer_values.addEventListener('click', function () {

                    if (csvInputAB.value === "") {
                        window.alert('Please select a file');
                    }
                    else {
                        // window.alert(fileArray);
                        const url = 'http://localhost:3000/calculators/bouguer';
                        let data_sentAB = {
                            data_bouguer: fileContent,
                        };
                        console.log('fielecontent : ' + fileContent);
                        let json_data_sentAB = JSON.stringify(data_sentAB);
                        console.log("json: " + json_data_sentAB);

                        console.log(json_data_sentAB);
                        console.log(typeof (json_data_sentAB));
                        console.log(json_data_sentAB.length);

                        var request = new Request(url, {
                            method: 'POST',
                            body: json_data_sentAB,
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                        });

                        fetch(request)
                            .then(function (response) {
                                // Convertir a JSON
                                console.log('in frontend');
                                console.log(response);
                                return response.json();
                            })
                            .then(function (json_responseBA) {
                                // Ahora 'j' es un objeto JSON
                                console.log(json_responseBA);
                                console.log(json_responseBA.anomalyValue);
                                console.log(json_responseBA.axisX);
                                console.log(json_responseBA.axisY);
                                console.log(parseInt(json_responseBA.axisY));
                                document.getElementById('res_bouguer').innerHTML = json_responseBA.anomalyValue;

                                let g = document.getElementById('chart_div');


                                var dataBA = [{
                                    z: json_responseBA.anomalyValue,
                                    x: json_responseBA.axisX,
                                    y: json_responseBA.axisY,
                                    type: "contour",
                                    colorscale: "Viridis"
                                }
                                ];
                                console.log(dataBA);

                                var layout = {
                                    title: "Basic Bouguer Anomaly"
                                }

                                Plotly.newPlot(g, dataBA, layout);
                                ;
                            });

                    }
                });
            });
        }
    });


    //console.log (selectCounty.selectedIndex);


    //-----Submit Input validated  -----// 
    /* const data_analyst_values = document.getElementById('data_analyst_values');
     console.log(data_analyst_values);
     data_analyst_values.addEventListener('click', function () {*/

    /*const url = 'http://localhost:3000/calculators/data_analyst';
    let data_envio = {
        name: fileArray,
    }
    let json_data_envio = JSON.stringify(data_envio);
    console.log("json: " + json_data_envio);

    var request = new Request(url, {
        method: 'POST',
        body: data_envio,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
        .then(function (respuesta) {
            // Convertir a JSON
            console.log('estou en el frontend');
            console.log(respuesta);
            return respuesta.json();
        })
        .then(function (j) {
            // Ahora 'j' es un objeto JSON
            console.log(j);
            document.getElementById('res_analyst').value = j.resultado;
        });

    /*});*/
}