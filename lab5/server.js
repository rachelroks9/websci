// required dependencies
var path = require('path');
var express = require('express');
var app = express();
var twitter = require('twit');
var fs = require('fs');
var server  = require('http').Server(app);
var io = require('socket.io')(server);

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
        // write tweets to JSON file
        fs.writeFile("ITWS4500-S16-blackr2-tweets.json",JSON.stringify(tweet));
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
    queries[socket.id][q].stop();
    delete queries[socket.id][q];
    console.log('Limit reached; Removed Search >>', q);

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
 
});
 
// start server on port
server.listen(app.get('port'), function() {
  console.log('Server up on port ' + app.get('port'));
});