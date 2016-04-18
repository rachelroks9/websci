// required dependencies
var express   = require('express');
var app = express();
var server = require('http').Server(app);
var sparql    = require('sparql');

var io = require('socket.io')(server);
var jade      = require('jade');
var stylus    = require('stylus');

//starts up the server
app.listen(3000, function() {
  console.log("Server up on localhost:3000");
});

app.use(express.static(__dirname));

//sends the data to the index.html file
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// static files in '/public' directory
app.use(express.static(__dirname + '/public'))
app.use('/public/scripts', express.static(__dirname + '/public/scripts'))

// default SPARQL query
var query    = 
'SELECT DISTINCT ?school ?campusSize ?averageClassSize WHERE { \
   ?school a dbo:School; \
   dbo:campusSize ?campusSize; \
   dbo:averageClassSize ?averageClassSize. \
} ORDER BY DESC(?campusSize) \
LIMIT 10'

// get/show index page
app.get('/', function(req, res) {
  console.log ("here");
  res.render('index', {query: query})
  console.log (query);
})

// socket io connection
io.on('connection', function(socket) {
  console.log('>> NEW USER connected')

  // when new query is recieved
  socket.on('q', function(q) {
    // connect to dbpedia
    var sparqlClient = new sparql.Client('http://dbpedia.org/sparql')
    // run query
    sparqlClient.query(q, function(err, res) {
      if (err) { // query has error
        socket.emit('query_error')
        console.log('>> ERROR ' + err)
      } else { // query is successful
        var data = res.results.bindings
        var header = res.head.vars
        socket.emit('query_data', data, header)
        console.log('>> EXECUTED sparql query')
      }
    })
  })
})

