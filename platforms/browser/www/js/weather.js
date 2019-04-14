function GEOweather(Latitude,Longitude)
{
    var Latitude = Latitude;
    var Longitude = Longitude;  
    console.log("Weater page"+Latitude);
    console.log("Weater page"+Longitude);
    weather(Latitude,Longitude);
}



// Weater main   weather(Latitude,Longitude)

function weather(Latitude,Longitude) {
    var Latitude = Latitude;
    var Longitude = Longitude;
    console.log("Weater page"+Latitude);
    console.log("Weater page"+Longitude);
    var http = new XMLHttpRequest();
    //const url = 'https://api.darksky.net/forecast/3ad7f8e54c6fdcafbe0dfa539a9ae18c/37.8267,-122.4233';
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=92757f89a5760a1310e7b5657fff90d2';
    
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
        //var locationTimezone = responseJSON.timezone;
        //console.log(locationTimezone);
        //var temp = responseJSON.currently.temperature;
        //console.log(temp);
        //var celsiusS = Math.floor((temp - 32) * 5 / 9);
        
        //var dailyS = responseJSON.daily.summary;
        
        
		
        
        //document.getElementById('temperatureMainS').innerHTML = celsiusS.toFixed(1);
        //document.getElementById('dailyS').innerHTML = dailyS;
        
    }
}
