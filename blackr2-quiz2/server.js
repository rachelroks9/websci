// required dependencies
var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var fs = require('fs');
var Forecast = require('forecast');
var mongodb = require('mongodb');
var weather = require('openweathermap');
var cities = require('cities');

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

weather.api_key = '9bad93f824d15bad63180444fc21a901';
weather.temp = 'f';

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/ITWS4500-S16-blackr2-quiz1-db';


// connect on port 3000
app.listen(3000, function() {
	console.log("Server up on localhost:3000");
});

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
	extended: true
}));

//sends the data to the index.html file
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/go', function(req, res) {
  var weathers = [];
  // get weather

  var zip = [];
  fs.readFile(__dirname + '/zipcodes.txt', 'utf8', function (err2, zipcodes) {
    if (err2) return console.log(err2)
    
    zip = zipcodes.split('\n');
    // console.log(zip);
    objectZ = {};

    for (var i = 0; i < zip.length; i++) {
      var zipName = zip[i];
      var temp = cities.zip_lookup(zip[i]);
      var locName = temp.city;
      
      var inf2 = [];
      inf2.push(zipName);
      inf2.push(locName);
      // objectZ[zip[i]] = {"lat": temp.latitude, "lon": temp.longitude};
      forecast.get([temp.latitude, temp.longitude], function(err, weather) {
        var currentTemp = weather.currently.temperature;
        console.log("The current temparature in ", zipName, " is", currentTemp, 'degrees.')
        inf2.push(currentTemp);
      });
      
      // console.log (inf2); 
     // console.log(objectZ);
    }
   
    // connect to mongo database
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);
        // delete current database information
        db.collection('tweetsInfo', {}, function (err, result) {
          result.remove({}, function (error, res) {
            if (error) {
              console.log(error);
            } 
            db.close();
          });
        });
      }
    });

    // here is where I would insert hte data
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        // var tweetsStuff = JSON.stringify(tweetsBuffer);
        // var jsonStuff = JSON.parse(tweetsStuff)
        // var collection = db.collection('weatherInfo');

        // // put all of the tweets in the database
        // collection.insert(jsonStuff, function (err, result) {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     console.log ("Inserted tweets into database.");
        //     db.close();
        //   }
        // });
        // // text for alert
        // return res.json({building: "A database has been created with the following tweets."});
      }

    });
  })
  

})