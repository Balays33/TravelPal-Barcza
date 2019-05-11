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
    convert();
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
    //initMap();

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Here comes About page');
        initMap();

    }
    if (page.name === 'famousbirthdays') {
        // Following code will be executed for page with data-page attribute equal to "WeaterApp"
        //myApp.alert('Here comes famousbirthdays page');
        //  famousbirthdays();
        
    }
    if (page.name === 'exchange') {
        // Following code will be executed for page with data-page attribute equal to "WeaterApp"
        //myApp.alert('Here comes exchange page');
        openCageCC();
        
    }
    
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
   // myApp.alert('Here comes About page');
})






////////////////////////// get time ////////////////////////////

function getTime( ){
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

    setTimeout(getTime, 1000);
    
}
//------------------------------------------------------//

// global variable
var Latitude;
var Longitude;
var contryToExchang;
var currencyCODE;

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
        /*
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;
        */
                            // pass the location to opencage
                            
                           Latitude =position.coords.latitude;
                           Longitude =position.coords.longitude;
                            console.log('Latitude: '+Latitude);
                            console.log('Longitude: '+Longitude);
                            openCage();
                            weatherMain(Latitude,Longitude);
                            GEOweather(Latitude,Longitude);
                    
                             
                            
    }
 
    // onError Callback receives a PositionError object
    
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        console.log(error);
    }
 

///////////////////////////// Weater main //////////////////////////////////////////

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
        
    }
}
///--------------------------------------------------------------------------////
        
        



    // Options: throw an error if no update is received every 30 seconds.
    //
   // var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });


 ////////////////////////////////////////// OpenCage location information ////////////////////////////////////////  

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
        var countryCode = responseJSON.results[0].components.country_code;

        contryToExchange =  responseJSON.results[0].components.country;
        var currencyCODE = responseJSON.results[0].annotations.currency.iso_code;
        //convert(currencyCODE);
        //convertlocal(currencyCODE);
        
        console.log("Contry code here!!!" + countryCode);
        document.getElementById('littleFlag').src = "https://www.countryflags.io/" + countryCode + "/shiny/32.png";
        
        // Placing formatted data on the front ed
        //document.getElementById('opencage').innerHTML = oc;
        document.getElementById('city').innerHTML = wCity;
        document.getElementById('country').innerHTML = country;
        
        

    }   
}
///--------------------------------------------------------------------------///


///////////////////////////////// Currency Converter USA - local //////////////////////////////////////////
// geoLocation function
function geoLocationCC() {
    navigator.geolocation.getCurrentPosition(geoCallback2, onError)
}

function geoCallback2(position) {
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    console.log('Latitude: ' + Latitude);
    console.log('Longitude: ' + Longitude);
    openCageCC();
}
function openCageCC() {
    console.log(Latitude, Longitude);
    var http = new XMLHttpRequest();
    /*
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=47.499663+19.075570&key=a36ac62bfab44ff09eb13691ba88ea47';

    only test purpose Budapest location
    */
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + Latitude + '+' + Longitude + '&key=a36ac62bfab44ff09eb13691ba88ea47';
    http.open("GET", url);
    http.send();
    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        console.log('openCageCC : '+responseJSON);
        currencyCODE = responseJSON.results[0].annotations.currency.iso_code;
        console.log('This is sending the location currency :'+currencyCODE);
        var countryCode = responseJSON.results[0].components.country_code;
        document.getElementById('littleFlagExchange').src = "https://www.countryflags.io/" + countryCode + "/shiny/32.png";
        document.getElementById('currentcyTEXTL').innerHTML=currencyCODE;
        document.getElementById('littleFlagExchangeLocal').src = "https://www.countryflags.io/" + countryCode + "/shiny/32.png";
        document.getElementById('currentcyTEXTLC').innerHTML=currencyCODE;
        //convert(currencyCODE);
        //convertlocal(currencyCODE);
    }
}

function convert(){
    geoLocationCC();
    var http = new XMLHttpRequest();
    const url = 'https://api.exchangeratesapi.io/latest?base=USD';
    /*
        different api 
        const url = 'http://apilayer.net/api/live?access_key=310ff77de7a824ad7b6774e18cf4e29e&currencies=EUR,GBP,CAD,PLN&source=USD';
        const url = 'http://apilayer.net/api/live?access_key=310ff77de7a824ad7b6774e18cf4e29e&currencies='+ currencyCODE+'&source=USD';
        const url = 'https://api.exchangeratesapi.io/latest?symbols=HUF';
        const url = 'https://free.currconv.com/api/v7/convert?q=EUR_HUF&compact=ultra&apiKey=8e9a85acc5ca01bfbb5e';
    */
   

    console.log('What happining here'+currencyCODE);
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
      help = "EUR_"+currencyCODE;
      console.log(help);
      var rate = responseJSON.rates[currencyCODE];
      console.log("exchange java  :"+rate); 
      var input =document.getElementById('input').value;
      console.log("INPUT here"+input);
      var result = input * rate;
      document.getElementById('result').innerHTML = result;
      
  }
}
 //-----------------------------------------------------------------------------------------/////

 ///////////////////////////////// Currency Converter Local- USD ///////////////////////////////////////////
 
function convertlocal(){

    var http = new XMLHttpRequest();
    //const url = 'http://apilayer.net/api/live?access_key=310ff77de7a824ad7b6774e18cf4e29e&currencies=EUR,GBP,CAD,PLN&source=USD';
    //const url = 'http://apilayer.net/api/live?access_key=310ff77de7a824ad7b6774e18cf4e29e&currencies=USD&source=' + currencyCODE ;
    const url = 'https://api.exchangeratesapi.io/latest?base='+currencyCODE;
    console.log("should" +currencyCODE);
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
      
      var rate = responseJSON.rates.USD;
      console.log("exchange java  :"+rate);
      
      var input =document.getElementById('input2').value;
      console.log("INPUT here from the local"+input);
      var resultlocal = input * rate;
      document.getElementById('result2').innerHTML = resultlocal;
      
    
  }
}


 //-----------------------------------------------------------------------------------------/////


 ////////////////////////////////////// Google MAP ////////////////////////////////////

 var house_number;
 var road;
 var city;
 var postcode;
 var country;

 function initMap() {
     //(Latitude,Longitude lat: 53.346, lng: -6.2588
    var correctposition = {lat: Latitude, lng: Longitude};
    console.log('Google MAP Latitude: '+Latitude+'Longitude: '+Longitude);
    var map = new google.maps.Map(document.getElementById('map'),
   { zoom: 12,
    center: correctposition
    });
    var marker = new google.maps.Marker({
    position: correctposition,
    map: map
    }); 
    /*
    var otherloc = {lat: 53.3458, lng: -6.2575};
    var marker2 = new google.maps.Marker({
        position: otherloc,
        map: map
    });
    
    var home = {lat: Latitude, lng: Longitude};
    var marker3 = new google.maps.Marker({
        position: home,
        map: map
    })
    */
    writeOutInfo();
}

// get your location country city data and currency

function writeOutInfo(){

    var printOutLocation = document.getElementById('gpslocation');
    printOutLocation.innerHTML = 'Latitude: '  + Latitude      + '<br />' +
                                 'Longitude: ' + Longitude     + '<br />' +
                                '<hr />'      + printOutLocation.innerHTML;

    var http = new XMLHttpRequest();
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=53.346+-6.2588&key=b95ccb4da5784bfca72b01a6b2af690f';
    http.open("GET", url);
    http.send();
    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);

        console.log(responseJSON);

        house_number = responseJSON.results[0].components.house_number;
        road = responseJSON.results[0].components. road;
        city = responseJSON.results[0].components.city;
        postcode =responseJSON.results[0].components.postcode;
        country = responseJSON.results[0].components.country;
        var currency = responseJSON.results[0].annotations.currency.name;

        document.getElementById('getlocatinonC').innerHTML ="House number: "+house_number+"<br>Road: "+road+ "<br>City: " + city +"<br>Postcode:"+postcode+ 
                                                            "<br>Country: " + country +"<br>Currency: " + currency;
        }
    }


 ////-------------------------------------------   Storing files in the phone -----------------------------------------//////
 //var fileToCreate;

function tryingFile(){

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
    //document.addEventListener("deviceready", function() { 
        //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
      //}, false); 
      console.log('Saving My  Latitude: '+Latitude+'Longitude: '+Longitude);
}

function fileSystemCallback(fs){

    // Name of the file I want to create
    var fileToCreate = "locationFile.txt";
    //fileToCreate = "locationFile.txt";
    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}

var fileSystemOptionals = { create: true, exclusive: false };
var entry;
function getFileCallback(fileEntry){
    
    var dataObj = new Blob([' Latitude: '+Latitude,' \nLongitude: '+Longitude,' \nCurrency code: '+currencyCODE,
                            '\n house_number: '+house_number,' \nroad: '+road,' \ncity: '+city,' \npostcode: '+postcode,' \ncountry: '+country], { type: 'text/plain' });
    entry = fileEntry;
    // Now decide what to do
    // Write to the file
    writeFile(fileEntry, dataObj);

    // Or read the file
    readFile(fileEntry);
}

// Let's write some files
function writeFile(fileEntry, dataObj) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['Hello'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

    });
}

// Let's read some files
function readFile(fileEntry) {

    // Get the file from the file entry
    fileEntry.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = function() {

            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntry.fullPath);

        };

    }, onError);
}

// Let's read some files
function readFilePrintOut() {

    // Get the file from the file entry
    entry.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = function() {

            console.log("Successful file read: " + this.result);
            console.log("file path: " + entry.fullPath);
            document.getElementById('printOutfromFile').innerHTML =reader.result;

        };

    }, onError);
}

/////////////////////////////////////////////////////////////////////////////////////////
    



 //----------------------------------------CAMERA APP---------------------------------------------------///

 function takePics(){
    navigator.camera.getPicture(cameraCallback, onError);
}

function cameraCallback(imageData){
    var image = document.getElementById('cameraPicture');
    image.src = imageData;

}

/////////////////////////////////////////////////////////////////////////////


//---------------------------Famous Birthdays App----------------------------------////

function famousbirthdays(){

    var http = new XMLHttpRequest();
    const url = 'https://celebritybucks.com/developers/birthdays/JSON';
    
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
      
      var length = responseJSON.Birthdays.length;
      console.log(length);
      
        var i;
        demop = document.getElementById('famousbirthdaysHOLDER');
        //demop1 = document.getElementById('famousbirthdaysHolderImage');
        for (i = 0; i < length; i++) {
          var name = responseJSON.Birthdays[i].name;
          var dob = responseJSON.Birthdays[i].dob;
          var age = responseJSON.Birthdays[i].age;
          demop.innerHTML = demop.innerHTML+name + "_____b-day: "+dob + "____age: "+age +"<br><hr>" ;
          //demop1.innerHTML = demop1.innerHTML+dob + "<br>";
          //famousbirthdaysHOLDERbday
          console.log(i,name);
        }
  }
}
//////////////////////////////////////////////