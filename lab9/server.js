// required dependencies
var express = require('express');
var twitter = require('twitter');
var app = express();
var fs = require('fs');
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var json2csv = require('json2csv');
var mongodb = require('mongodb');
var jstoxml = require('jstoxml');

// global variables
var tweetsBuffer = [];
var JSONExists = false;
var CSVExists = false;
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/ITWS4500-S16-blackr2-tweets-db';

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

app.get('/tweets', function(req, res) {
  tweetsBuffer = [];
	// twitter object
	var client = new twitter({
		consumer_key: 'NlfIcAOtwQcR6F8XQQ5o2aecN',
    consumer_secret: '0QRqiFAaJeSNYPtIk2wmY8IdNVkbcmTvm54leG1nHbnieFCPYv',
    access_token_key: '151226369-BwfajRc6ajKp7fqHrnvohDCRZoe4ClDDfMs2n4wM',
    access_token_secret: '2QvNYhSN2eGq3j2T8FG1QP18QHNwwq4lXfWGOYcJpGBpt'
	});

	// default number of tweets being loaded
	var maxCount = 20;
	var exportType = "";
	
	// if something is in query box
	if(req.query && req.query.search) {
		var query = {track: req.query.search}
	} 
  // if query box is empty
  else {
		var query = {locations:'-73.68,42.72,-73.67,42.73'};
	}

	client.stream('statuses/filter', query, function(stream) {
		// set number of tweets user wants
		if (req.query.count) {
			maxCount = req.query.count;
		}
		stream.on('data', function(tweet) {
			// adds the tweet to the array
			tweetsBuffer.push(tweet);
			// stop getting tweets if reach number the user wants to display
			if(tweetsBuffer.length == maxCount) {
				// put the tweets on index.html file
				res.status(200).json(tweetsBuffer);
				// stop the stream of tweets
				stream.destroy();
			}
		});
		
		stream.on('error', function(error) {
			console.log(error);
			throw error;
		});
	});
});

app.post('/export', function(req, res) {
	var exportT = req.body.etype;
  var fileName = req.body.fName;
	// if the user wants a JSON file
	if (exportT == "JSON") {
		fs.exists("export_files/JSON_files/ITWS4500-S16-blackr2-tweets.json", function(exists) {
			// if the file already exists
			if (exists) {
				JSONExists = true;
			}
			// if the file doesn't exist
			else {
				JSONExists = false;
			}
		});
		// write to the JSON file
	 	fs.writeFile("export_files/JSON_files/ITWS4500-S16-blackr2-tweets.json", JSON.stringify(tweetsBuffer));
	}
	// if the user wants a CSV file
	else if (exportT == "CSV") {
		fs.exists("export_files/CSV_files/ITWS4500-S16-blackr2-tweets.csv", function(exists) {
			// if the file already exists
			if (exists) {
				CSVExists = true;
			}
			// if the file doesn't exist
			else {
				CSVExists = false;
			}
		});

    // CSV file information
    var csvFile = "ITWS4500-S16-blackr2-tweets.csv";
    var fields = ["created_at","id","text","user.id","user.name","user.screen_name","user.location","user.followers_count","user.friends_count","user.created_at","user.time_zone","user.profile_background_color","user.profile_image_url","geo","coordinates","place"];
    var headerFields = ["created_at","id","text","user_id","user_name","user_screen_name","user_location","user_followers_count","user_friends_count","user_created_at","user_time_zone","user_profile_background_color","user_profile_image_url","geo","coordinates","place"];
    
    // write tweets to CSV file
    json2csv( 
      { data: tweetsBuffer, fields: fields, fieldNames: headerFields},
      function(err, csv) {
        if (err) throw err;
        fs.writeFile("export_files/CSV_files/" + csvFile, csv, function(err) {
          if (err) throw err;
        });
      }
    );
	}
  // if the user wants a xml file
  else if (exportT == "xml") {
    // if no file name is entered, put default file name
    if (req.body.fName == undefined) {
      fileName = "ITWS4500-S16-blackr2-tweets";
    }
    
    var xml = "";

    // connect to mongo database
    MongoClient.connect(url, function (err, db) {
      db.collection('tweetsInfo', function (err, collection) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          // pull all of the tweets in the database
          collection.find().toArray(function (err, docs) {
            if (err) {
              console.log (err);
            } else {
              // put all of the tweets information to XML file
              xml = jstoxml.toXML(docs, {header: true, indent: "  "});
              fs.writeFile("export_files/XML_files/" + fileName + ".xml", xml);
              db.close();
            }
          });        
        }
      });
    });
  }
});

app.get('/export', function(req, res) {
	// messages to be sent on alert to user
	if (JSONExists && CSVExists) {
    return res.json({myJSON: 'A JSON file was previously created. It has been updated with the following tweets.', myCSV: 'A CSV file was previously created. It has been updated with the following tweets.', myXML: "An XML file has been created with the following tweets."});
  }
  else if (JSONExists && !CSVExists) {
    return res.json({myJSON: 'A JSON file was previously created. It has been updated with the following tweets.', myCSV: 'A CSV file has been created with the following tweets.', myXML: "An XML file has been created with the following tweets."});
  }
  else if (!JSONExists && CSVExists) {
    return res.json({myJSON: 'A JSON file was created with the following tweets.', myCSV: 'A CSV file was previously created. It has been updated with the following tweets.', myXML: "An XML file has been created with the following tweets."});
  }
  else {
    return res.json({myJSON: 'A JSON file was created with the following tweets.', myCSV: 'A CSV file was created with the following tweets.', myXML: "An XML file has been created with the following tweets."});
  }
});


app.get('/build', function(req, res) {
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

  // connect to mongo database
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var tweetsStuff = JSON.stringify(tweetsBuffer);
      var jsonStuff = JSON.parse(tweetsStuff)
      var collection = db.collection('tweetsInfo');

      // put all of the tweets in the database
      collection.insert(jsonStuff, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log ("Inserted tweets into database.");
          db.close();
        }
      });
      // text for alert
      return res.json({building: "A database has been created with the following tweets."});
    }

  });
});

app.get('/read', function(req, res) {
  // connect to mongo database
   MongoClient.connect(url, function (err, db) {
    db.collection('tweetsInfo', function (err, collection) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        // pull all of the tweets in the database and output them to user
        collection.find().toArray(function (err, docs) {
          if (err) {
            console.log (err);
          } else {
            db.close();
            res.status(200).json(docs);
          }
        });        
      }
    });
  });
});