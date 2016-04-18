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

app.post('/query', function(req, res) {
  search = req.body.search;
});

app.get('/query', function(req, response) {
  var sparqlClient = new sparql.Client('http://dbpedia.org/sparql');
  sparqlClient.query(search, function(err, res) {
    // problem is that it does not go in error
    if (err) { // query has error
      console.log('>> ERROR ' + err);
      // alert user there is an error with the following text
      "There is an error in your query. Please fix this and try again.";
    } else { // query is successful
      data = res.results.bindings;
      header = res.head.vars;

      console.log('>> EXECUTED sparql query');
      console.log(search);
      console.log('\n');
      console.log(header);
      response.status(200).json(data);
    }
  });
});