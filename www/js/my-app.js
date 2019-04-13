// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    // automatt get geolocation to the progarm
    geoLocation();
    getTime();
    
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

// get time
function getTime( ){
    //alert('Hello');
    //setTimeout("getTime()", 1000); 
    var d = new Date();
    var d1 = new Date().toLocaleTimeString(); // 11:18:48 AM
    
    document.getElementById("gettimes").innerHTML = d1;
    //document.getElementById("getminutes").innerHTML = d.getMinutes();
    //document.getElementById("gettime").innerHTML = d.getHours();
    //console.log(d1);

    var today = new Date().toLocaleDateString();
       //  07-06-2016 06:38:34
    //var dd = String(today.getDate()).padStart(2, '0');
    //var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    //var yyyy = today.getFullYear();

    //today = mm + '/' + dd + '/' + yyyy;
    document.getElementById("getmount").innerHTML = today;
    //document.write(today);

    //setTimeout(getTime, 1000);
     
}


// global variable
var Latitude;
var Longitude;

function sendLocation(){
    var lat =Latitude;
    var ltu = Longitude;
    getLocationMain(lat,ltu);
}

// geoLocation function


function geoLocation(){
   
    navigator.geolocation.getCurrentPosition(geoCallback, onError)
       

}


// onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    function geoCallback(position) {
        console.log(position);
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;

                            // pass the location to opencage
                            
                           Latitude =position.coords.latitude;
                           Longitude =position.coords.longitude;
                            console.log(Latitude);
                            console.log(Longitude);
                            openCage();
                            getLocationMain(Latitude,Longitude);
                            weatherMain(Latitude,Longitude);
                             
                            
    }
 
    // onError Callback receives a PositionError object
    
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        console.log(error);
    }
 

// Weater main

function weatherMain(Latitude,Longitude) {
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
        var celsius = Math.floor((temp - 32) * 5 / 9);
        
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
        document.getElementById('temperatureMain').innerHTML = celsius.toFixed(1);
        document.getElementById('daily').innerHTML = daily;
        document.getElementById('proto').innerHTML = proto;
    }
}

        
        



    // Options: throw an error if no update is received every 30 seconds.
    //
   // var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });


   

   function openCage(){
    
    console.log(Latitude , Longitude);
    // The XMLHttpRequest object, is the one in 
    // charge of handleing the request for us
    var http = new XMLHttpRequest();

    // The url to send the request to. Notice that we're passing
    // here some value of Latituted and longitude for the API 
    // to process   47.499663, 19.075570
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + Latitude + '+' + Longitude + '&key=a36ac62bfab44ff09eb13691ba88ea47';
    //const url = `https://api.opencagedata.com/geocode/v1/json?q=Latitude+Longitude&key=a36ac62bfab44ff09eb13691ba88ea47`;
    console.log(Latitude , Longitude);
    // Opening the request. Remember, we will send
    // a "GET" request to the URL define above
    http.open("GET", url);
    // Sending the request
    http.send();

    // Once the request has been processed and we have
    // and answer, we can do something with it
    http.onreadystatechange = (e) => {
        
        // First, I'm extracting the reponse from the 
        // http object in text format
        var response = http.responseText;

        // As we know that answer is a JSON object,
        // we can parse it and handle it as such
        var responseJSON = JSON.parse(response); 
    
        // Printing the result JSON to the console
        console.log(responseJSON);

        // Extracting the individual values, just as we
        // do with any JSON object. Just as we did 
        // with the position.
        // REMEMBER: In this case, we have an array inside 
        // the JSON object.
        var city = responseJSON.results[0].components.city;
        var country = responseJSON.results[0].components.country;
        var currency = responseJSON.results[0].annotations.currency.name;
        var wCity = responseJSON.results[0].components.city;
        v

        // Formattng data to put it on the front end
        var oc = "City: " + city + "<br>Country: " + country + "<br>Currency: " + currency;

        // Placing formatted data on the front ed
        document.getElementById('opencage').innerHTML = oc;
        document.getElementById('city').innerHTML = wCity;
       // document.getElementById('country').innerHTML = country;
    }

   
    
}
