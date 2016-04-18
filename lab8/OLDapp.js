jQuery(document).ready(function($) {
  // connect to server
  var socket = io();

  // when query is submitted
  $('#query-form').submit(function(e) {
    // do not refresh page or do default form actions
    e.preventDefault();
    // send query to server
    var q = $('#query').val();
    socket.emit('q', q);
    // show spinner and clear results
    $('#spinner').show();
    $('#results').html('');
  });

  // when a successful query is returned
  socket.on('query_data', function(data, header) {
    // hide spinner
    $('#spinner').hide();

    // begin results string
    var htmlString = '<ul><li class="heading results-item"><ul class="results-sub-list">';
    // create "table" header
    for (h in header) {
      htmlString += '<li>' + header[h] + '</li>';
    }
    htmlString += '</ul></li>';
    // add all data to results string
    var count = 0;
    for (d in data) {
      count++;
      if (count > 10) break; // only display 10 results
      htmlString += '<li class="results-item"><ul class="results-sub-list">';
      for (i in data[d]) {
        htmlString += '<li>' + data[d][i].value + '</li>';
      }
      htmlString += '</ul></li>';
    }
    htmlString += '</ul>';

    // display results
    $('#results').html(htmlString);
  });

  // when a query has an error
  socket.on('query_error', function() {
    // hide spinner
    $('#spinner').hide();
    // display error message
    var htmlString = "<p class='error'>Your query has an error :(</p>";
    $('#results').html(htmlString);
  });
});

