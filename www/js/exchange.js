/* */
function convert(){

    var input =document.getElementById('input').value;
  
  
    var http = new XMLHttpRequest();
    const url = 'http://apilayer.net/api/live?access_key=310ff77de7a824ad7b6774e18cf4e29e&currencies=EUR,GBP,CAD,PLN&source=USD';
  
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
      var rate = responseJSON.quotes.USDEUR;
      console.log(rate);
  
      var result = input * rate;
      document.getElementById('rated').innerHTML = result;
  }
  
  //////////////////////////////////////////////////////////////////////////////////////