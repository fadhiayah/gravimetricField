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
                // Convertir a JSON
                console.log('in frontend');
                console.log(response);
                return response.json();
            })
        //.then(function (json_response) {
        // Ahora 'j' es un objeto JSON
        //console.log(json_response);
        //document.getElementById('decimalLat').value = json_response.decimalLat;
        //document.getElementById('decimalLon').value = json_response.decimalLon;
    });
}