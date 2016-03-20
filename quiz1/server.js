// required dependencies
var path = require('path');
var express = require('express');
var app = express();
var Forecast = require('forecast');
var server  = require('http').Server(app);

// connect on port 3000
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '/')));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Initialize 
var forecast = new Forecast({
  service: 'forecast.io',
  key: '28800f821fc34338b45c29ca07407a40',
  units: 'far', // Only the first letter is parsed 
  cache: true,      // Cache API requests
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
    minutes: 27,
    seconds: 45
    }
});

// RUN THE FOLLOWING CODE WHEN RUN IS CLICKER i.e. ("/?run=")
// Retrieve weather information from coordinates (Spokane, WA) 
forecast.get([47.658779, -117.426048], function(err, weather) {
  if(err) return console.dir(err);
  var currentTemp = weather.currently.temperature;
  console.log("The current temparature in Spokane, WA is", currentTemp, 'degrees.');
  
  if (currentTemp < 10) {
      console.log("Currently it is freezing in Spokane, WA.");
    } else if (currentTemp < 40 && currentTemp >= 10) {
      console.log("Currently it is cold in Spokane, WA.");
    } else if (currentTemp < 70 && currentTemp >= 40) {
      console.log("Currently it is warm in Spokane, WA.");
    } else if (currentTemp >= 70) {
      console.log("Currently it is hot in Spokane, WA.");
    }
});


// start server on port
server.listen(app.get('port'), function() {
  console.log('Server up on port ' + app.get('port'));
});