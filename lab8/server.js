// required dependencies
var express   = require('express');
var app = express();
var server = require('http').Server(app);
var sparql    = require('sparql');

//starts up the server
app.listen(3000, function() {
	console.log("Server up on localhost:3000");
});

app.use(express.static(__dirname));

//sends the data to the index.html file
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/search', function(req, res) {
  // connect to dbpedia
  var sparqlClient = new sparql.Client('http://dbpedia.org/sparql')
  console.log("INSEARCH");
	
	//use the query the user wants if there is one, else set the query to RPI's location
	if(req.query && req.query.search) {
		var query = req.query.search;
	} else {
		var query = 
    'SELECT DISTINCT ?school ?campusSize ?averageClassSize WHERE { \
        ?school a dbo:School; \
        dbo:campusSize ?campusSize; \
        dbo:averageClassSize ?averageClassSize. \
    } ORDER BY DESC(?campusSize) \
    LIMIT 10';
  }



	client.stream('statuses/filter', query, function(stream) {
		//if a user puts in a number of tweets that they want, change the variable
		if (req.query.count) {
			maxCount = req.query.count;
		}
		stream.on('data', function(tweet) {
			//shows tweets in the console so I know the app is getting them
			// console.log(tweet.text);
			//adds the tweet to the array
			tweetsBuffer.push(tweet);
			//once the array has the number of tweets the user wants or the default number
			if(tweetsBuffer.length == maxCount) {
				//place the tweets onto the index.html file
				res.status(200).json(tweetsBuffer);
				//stop the stream
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
	//if the user wants a JSON file
	if (exportT == "JSON") {
		fs.exists("export_files/JSON_files/ITWS4500-S16-blackr2-tweets.json", function(exists) {
			//if the file already exists
			if (exists) {
				JSONExists = true;
			}
			//if the file doesn't exist
			else {
				JSONExists = false;
			}
		});
		//write to the JSON file
	 	fs.writeFile("export_files/JSON_files/ITWS4500-S16-blackr2-tweets.json", JSON.stringify(tweetsBuffer));
	}
	//if the user wants a CSV file
	else if (exportT == "CSV") {
		fs.exists("export_files/CSV_files/ITWS4500-S16-blackr2-tweets.csv", function(exists) {
			//if the file already exists
			if (exists) {
				CSVExists = true;
			}
			//if the file doesn't exist
			else {
				CSVExists = false;
			}
		});

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
});

app.get('/export', function(req, res) {
	//these messages are posted in a JavaScript alert
	//each message varies depending on if the files exist or not
	if (JSONExists && CSVExists) {
    return res.json({myJSON: 'A JSON file was previously created. It has been updated with the following tweets.', myCSV: 'A CSV file was previously created. It has been updated with the following tweets.'});
  }
  else if (JSONExists && !CSVExists) {
    return res.json({myJSON: 'A JSON file was previously created. It has been updated with the following tweets.', myCSV: 'A CSV file has been created with the following tweets.'});
  }
  else if (!JSONExists && CSVExists) {
    return res.json({myJSON: 'A JSON file was created with the following tweets.', myCSV: 'A CSV file was previously created. It has been updated with the following tweets.'});
  }
  else {
    return res.json({myJSON: 'A JSON file was created with the following tweets.', myCSV: 'A CSV file was created with the following tweets.'});
  }
});

app.get('/build', function(req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);

      // Get the documents collection
    var collection = db.collection('tweetsInfo');




      //Close connection
      db.close();
    }
  });
});

app.get('/read', function(req, res) {
   MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);

      // Get the documents collection
    var collection = db.collection('tweetsInfo');


    // find tweets users
    collection.find({name: 'XXXXXX'}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
    });

      //Close connection
      db.close();
    }
  });


});

app.post('/xml', function(req, res) {
  // console.log(req);
  var fileName = req.body.fName;

  var xml = builder.create('tweetsInfo')
    .ele('created_at')
      .txt('created_at text')
      .up()
    .ele('id')
      .txt('id text')
      .up()
    .ele('text')
      .txt('text text')
      .up()
    .ele('user')
      .ele('user_id')
        .txt('user_id text')
        .up()
      .ele('user_name')
        .txt('user_name text')
        .up()
      .ele('user_screen_name')
        .txt('user_screen_name text')
        .up()
      .ele('user_location')
        .txt('user_location text')
        .up()
      .ele('user_followers_count')
        .txt('user_followers_count text')
        .up()
      .ele('user_friend_count')
        .txt('user_friend_count text')
        .up()
      .ele('user_created_at')
        .txt('user_created_at text')
        .up()
      .ele('user_time_zone')
        .txt('user_time_zone text')
        .up()
      .ele('user_profile_background_color')
        .txt('user_profile_background_color text')
        .up()
      .ele('user_profile_image_url')
        .txt('user_profile_image_url text')
        .up()
      .up()
    .ele('geo')
      .txt('geo text')
      .up()
    .ele('coordinates')
      .txt('coordinates text')
      .up()
    .ele('place')
      .txt('place text')
      .up()
    .end({ pretty: true});

  fs.writeFile("export_files/XML_files/" + fileName + ".xml", xml);
});
