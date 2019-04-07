function getLocationMain(){
    var lat =Latitude;
    var ltu = Longitude;
}


function weather(Latitude,Longitude) {
    var Latitude = Latitude;
    var Longitude = Longitude;
    var http = new XMLHttpRequest();
    //const url = 'https://api.darksky.net/forecast/3ad7f8e54c6fdcafbe0dfa539a9ae18c/37.8267,-122.4233';
    const url = 'https://api.darksky.net/forecast/3ad7f8e54c6fdcafbe0dfa539a9ae18c/' + Latitude + ',' + Longitude +'';
    
    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {

        // First, I'm extracting the reponse from the 
        // http object in text format
        var response = http.responseText;

        // As we know that answer is a JSON object,
        // we can parse it and handle it as such
        var responseJSON = JSON.parse(response);

        // Printing the result JSON to the console
        console.log(responseJSON);
        var locationTimezone = responseJSON.timezone;
        console.log(locationTimezone);
        var temp = responseJSON.currently.temperature;
        console.log(temp);
        var celsius = (temp-32)*(5/9);

        
        document.getElementById('location-timezone').innerHTML = locationTimezone;
        document.getElementById('temperature').innerHTML = celsius;
    }
}