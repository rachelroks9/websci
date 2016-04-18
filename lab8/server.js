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

app.get('/query', function(req, res) {
  var sparqlClient = new sparql.Client('http://dbpedia.org/sparql');
  sparqlClient.query(search, function(err, res) {
    if (err) { // query has error
      console.log('>> ERROR ' + err);
    } else { // query is successful
      data = res.results.bindings;
      header = res.head.vars;
      console.log('>> EXECUTED sparql query');
      console.log(search);
      console.log('\n');
      console.log('\n');
      console.log('\n');
      console.log(header);
      console.log('\n');
      console.log(data);
    }
  });

	// res.status(200).json(data, header);

});

app.post('/export', function(req, res) {
	
});

app.get('/export', function(req, res) {

});

app.get('/build', function(req, res) {

});

app.get('/read', function(req, res) {
  
});

app.post('/xml', function(req, res) {
  
});

app.get('/xml', function(req, res) {
     
});