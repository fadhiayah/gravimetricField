window.onload = function () {
    console.log('loaded site3')

    let select = document.querySelectorAll("select");
    console.log(select);
    let selectC = select[0];
    console.log(selectC);
    selectC.addEventListener("change", function () {
        let indexS = selectC.selectedIndex;
        console.log(indexS);
        let valueS = selectC.options[indexS].value;
        console.log(valueS);
        const url = 'http://localhost:3000/gravimetric_values/country';
        let data_sent_SC = {
            valueSelected: selectC.options[selectC.selectedIndex].value
        };
        let json_data_sent_SC = JSON.stringify(data_sent_SC);
        console.log("json: " + json_data_sent_SC);
        var request = new Request(url, {
            method: 'POST',
            body: json_data_sent_SC,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        fetch(request)
            .then(function (response) {
                // Convert a JSON
                console.log('in frontend');
                console.log(response);
                return response.json();
            })
            .then(function (json_response) {

                console.log(json_response);

                let selectCity = document.getElementById("selectCity")
                let c = json_response.city;
                let leng = c.length;

                selectCity.innerHTML = "";
                for (let i = 0; i <= (leng - 1); i += 1) {

                    let options = document.createElement("option");
                    options.innerHTML = c[i];
                    selectCity.appendChild(options);
                }
            });
    });


    let selectP = select[1];
    console.log(selectP);
    selectP.addEventListener("change", function () {
        let indexPS = selectP.selectedIndex;
        console.log(indexPS);
        let valuePS = selectP.options[indexPS].value;
        console.log(valuePS);
        const url = 'http://localhost:3000/gravimetric_values/province';
        let data_sent_PS = {
            valuePSelected: selectP.options[selectP.selectedIndex].value
        };
        let json_data_sent_PS = JSON.stringify(data_sent_PS);
        console.log("json: " + json_data_sent_PS);
        var requestP = new Request(url, {
            method: 'POST',
            body: json_data_sent_PS,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        fetch(requestP)
            .then(function (response) {
                // Convert a JSON
                console.log('in frontend');
                console.log(response);
                return response.json();
            })
            .then(function (json_response) {

                console.log(json_response);
                console.log(json_response.nameBase);


                let selectBases = document.getElementById("selectBases")
                let n = json_response.nameBase;
                let leng = n.length;
                console.log(n[1]);
                console.log(n.length);

                selectBases.innerHTML = "";

                for (let k = 0; k <= (leng - 1); k += 1) {

                    let optionsB = document.createElement("option");
                    optionsB.innerHTML = n[k];
                    selectBases.appendChild(optionsB);
                }
            });
    });

    let selectB = select[2];
    console.log(selectB);
    selectB.addEventListener("change", function () {
        let indexBS = selectB.selectedIndex;
        console.log(indexBS);
        let valueBS = selectB.options[indexBS].value;
        console.log(valueBS);
        const url = 'http://localhost:3000/gravimetric_values/base';
        let data_sent_BS = {
            valueBSelected: selectB.options[selectB.selectedIndex].value
        };
        let json_data_sent_BS = JSON.stringify(data_sent_BS);
        console.log("json: " + json_data_sent_BS);
        var requestB = new Request(url, {
            method: 'POST',
            body: json_data_sent_BS,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        fetch(requestB)
            .then(function (response) {
                // Convert a JSON
                console.log('in frontend');
                console.log(response);
                return response.json();
            })
            .then(function (json_response) {

                console.log(json_response);
                //console.log(json_response.nameBase);
                console.log(json_response);
                
                let ulDa = document.getElementById('res_valuesG');
                ulDa.innerHTML = ("  Base information :");
                let liName = document.createElement("li")
                liName.innerHTML = ('Name : ' + json_response.name);
                let liLat = document.createElement("li")
                liLat.innerHTML = ('Latitude : ' + json_response.lat);
                let liLong = document.createElement("li")
                liLong.innerHTML = ('Longitude : ' + json_response.long);
                let liValue = document.createElement("li")
                liValue.innerHTML = ('Gravimetric value [mGal] : ' + json_response.valueG);
               

                let pdf = document.createElement("a");
                let img = document.createElement ("img");
                img.src= "/images/pdf.jpg";
                pdf.href=json_response.pdf;
                pdf.download = json_response.name;
                
                img.className="pdf";
                

                ulDa.appendChild(liName);
                ulDa.appendChild(liLat);
                ulDa.appendChild(liLong);
                ulDa.appendChild(liValue);
                ulDa.appendChild(pdf);
                pdf.appendChild(img);
                
            });
    });
}