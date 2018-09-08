window.onload = function () {
    console.log('loaded site')

    let select = document.getElementById("continent");
    console.log(select);
    //let selectC = select[0];
    //console.log(selectC);
    select.addEventListener("change", function () {
        let indexS = select.selectedIndex;
        console.log(indexS);
        let valueS = select.options[indexS].value;
        console.log(valueS);
        const url = 'http://localhost:3000/official_websites/continent';
        let data_sent = {
            valueSelected: select.options[select.selectedIndex].value
        };
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
            })
            .then(function (json_response) {
                // Ahora 'j' es un objeto JSON
                console.log(json_response);

                let resLinks = document.getElementById('ulList');
                console.log(resLinks);
                let c = json_response.city;
                let w = json_response.sites;

                console.log(c);
                let leng = c.length;
                console.log(leng);

                resLinks.innerHTML = "";

                for (let i = 0; i <= (leng - 1); i += 1) {

                    let a = document.createElement("a");
                    //let y = a.innerHTML = (c[i] + " : " + w[i]);
                    let aContent = w[i];
                    a.innerHTML = aContent;
                    
                    let p = document.createElement("p");
                    let pContent = c[i] + " : " + aContent;
                    p.innerHTML = pContent;
                    //let casa1 = p.innerHTML = "esto funciona" + y ;
                    //console.log (casa1);  
                    let down = document.createElement("br");
                    a.href = w[i];
                    a.className = "linksWeb";
                    resLinks.appendChild(p);
                    p.appendChild(a);
                    a.appendChild(down);

                }



            });
    });




}
