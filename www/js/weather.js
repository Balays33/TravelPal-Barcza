

function weather(Latitude,Longitude) {
    var Latitude = Latitude;
    var Longitude = Longitude;
    var http = new XMLHttpRequest();
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
        var celsiusSite = Math.floor((temp - 32) * 5 / 9);
        
        var daily = responseJSON.daily.summary;
        
        //Skycons
        
			var iconRequest = responseJSON.currently.icon;
			
			var icons = new Skycons({'color' : '#eeeeee'});
			
			var iconList = [
				"clear-day",
				"clear-night",
				"partly-cloudy-day",
				"partly-cloudy-night",
				"cloudy",
				"rain",
				"sleet",
				"snow",
				"wind",
				"fog"
			];		
			console.log(icons);
			for (i = 0; i < iconList.length; i++) {
				if (iconRequest == iconList[i]) {
						icons.set('icon', iconList[i]);
					
				}
			}
			icons.play();
		
        //document.getElementById('location-timezone').innerHTML = locationTimezone;
        document.getElementById('temperature').innerHTML = celsiusSite.toFixed(1);
        document.getElementById('daily').innerHTML = daily;
        document.getElementById('proto').innerHTML = proto;
        document.getElementById('location-timezone').innerHTML = celsius.toFixed(1);
    }
}