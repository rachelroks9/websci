// required dependencies
var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http').Server(app);
var sparql    = require('sparql');
var bodyParser = require('body-parser');

// global variables
var search = "";
var data = "";
var header = "";
var buffer = [];

// connect on port 3000
app.listen(3000, function() {
	console.log("Server up on localhost:3000");
});

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
	extended: true 
}));

// sends the data to the index.html file
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/query', function(req, res) {
  search = req.body.search;
});

// when the user has a search
app.get('/query', function(req, response) {
  // empty buffer at start of new query
  var buffer = [];
  var sparqlClient = new sparql.Client('http://dbpedia.org/sparql');
  sparqlClient.query(search, function(err, res) {
    // if there is an error in the query
    if (err) { // query has error
      console.log('>> ERROR ' + err);
      response.status(500);
    // if the query is successful
    } else { 
      data = res.results.bindings;
      header = res.head.vars;

      // push data into an array
      buffer.push(header);
      for (var i = 0; i < data.length; i++) {
        buffer.push(data[i]);
      }

      console.log('>> EXECUTED sparql query');
      console.log(search);

      response.status(200).json(buffer);
    }
  });
});