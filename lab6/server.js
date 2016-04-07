// required dependencies
var path = require('path');
var express = require('express');
var app = express();
var twitter = require('twit');
var fs = require('fs');
var server  = require('http').Server(app);
var io = require('socket.io')(server);
var json2csv = require('json2csv');

var CSVexist = "";

// twitter object
var client = new twitter({
  consumer_key: 'NlfIcAOtwQcR6F8XQQ5o2aecN',
  consumer_secret: '0QRqiFAaJeSNYPtIk2wmY8IdNVkbcmTvm54leG1nHbnieFCPYv',
  access_token: '151226369-BwfajRc6ajKp7fqHrnvohDCRZoe4ClDDfMs2n4wM',
  access_token_secret: '2QvNYhSN2eGq3j2T8FG1QP18QHNwwq4lXfWGOYcJpGBpt'
});

// connect on port 3000
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '/')));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// hold all queries
var queries = []; 

// client has officially connected
io.on('connection', function (socket) { 
  // queries by user
  queries[socket.id] = {}; 
  
  // default stream
   socket.on('q', function(q) {
      var params = "";
      // if query box is empty
      if (q == null) {
        console.log('Default New Search >> Location around RPI');
        var rpi = ['-73.68', '42.72', '-73.67', '42.73'];
        params = { locations: rpi};
      } 
      // if something is in query box
      else { 
        console.log('New Search >> ', q);
        params = {track: q};
      }

      // set twitter stream, depends on searching for words or by location
      var stream = client.stream('statuses/filter', params);
 
      // stream for tweets
      stream.on('tweet', function(tweet) {
        socket.emit('tweet_', tweet);
      });
 
      // stream for reaching limit of tweets allowed by Twitter API
      stream.on('limit', function(limitMessage) {
        console.log('Limit for User: ' + socket.id + ' on query ' + q + ' has been reached.');
      });
 
      // stream for warning
      stream.on('warning', function(warning) {
        console.log('warning', warning);
      });
 
      // stream for disconnecting
      stream.on('disconnect', function(disconnectMessage) {
        console.log('disconnect', disconnectMessage);
      });
 
      queries[socket.id][q] = stream;
  });

  // stream for limit user specifies
  socket.on('limit_reached', function (count, q) {
    if(queries[socket.id][q]) {
      queries[socket.id][q].stop();
      delete queries[socket.id][q];
      console.log('Limit reached; Removed Search >>', q);
    }
  });
 
 // stream for removing search
  socket.on('remove', function(q) {
    if(queries[socket.id][q]) {
      queries[socket.id][q].stop();
      delete queries[socket.id][q];
      console.log('Removed Search >>', q);
    }
  });
 
  // stream for disconnecting from API
  socket.on('disconnect', function() {
    for (var k in queries[socket.id]) {
      queries[socket.id][k].stop();
      delete queries[socket.id][k];
    }
    delete queries[socket.id];
    console.log('Removed All Search from user >>', socket.id);
  });

  // stream for checking if JSON file exists
  socket.on('jsonExists', function(tweet) {
    fs.exists("ITWS4500-S16-blackr2-tweets.json", function(exists) {
      if (exists) {
        socket.emit("exists_", {saved: "exists"});
        console.log("yah");
      } else {
        socket.emit("exists_", {saved: "not"});
        console.log("not");
      }
    });
  });

  // stream for exporting a json file
  socket.on('json', function(tweet) {
    // write tweets to JSON file
    fs.writeFile("ITWS4500-S16-blackr2-tweets.json",JSON.stringify(tweet));
  });

  // stream for checking if CSV file exits
  socket.on('csvExists', function(tweet) {
    fs.exists("ITWS4500-S16-blackr2-tweets.csv", function(exists) {
      if (exists) {
        socket.emit("exists_", {saved: "exists"});
        console.log("yah");
      } else {
        socket.emit("exists_", {saved: "not"});
        console.log("not");
      }
    });
  });

  // CSV file information
  var csvFile = "ITWS4500-S16-blackr2-tweets";
  var fields = ["created_at","id","text","user.id","user.name","user.screen_name","user.location","user.followers_count","user.friends_count","user.created_at","user.time_zone","user.profile_background_color","user.profile_image_url","geo","coordinates","place"];
  var headerFields = ["created_at","id","text","user_id","user_name","user_screen_name","user_location","user_followers_count","user_friends_count","user_created_at","user_time_zone","user_profile_background_color","user_profile_image_url","geo","coordinates","place"];
  
  // stream for exporting a CSV file
  socket.on('save_csv', function(tweet, csvFile, CSVexist) {
    // write tweets to CSV file
    json2csv( 
      { data: tweet, fields: fields, fieldNames: headerFields},
      function(err, csv) {
        if (err) throw err;
        fs.writeFile(csvFile, csv, function(err) {
          if (err) throw err;
          socket.emit('saved_csv', csvFile + '.csv');
        });
      }
    );
  });
});
 
  
// start server on port
server.listen(app.get('port'), function() {
  console.log('Server up on port ' + app.get('port'));
});