var page = angular.module('tweetsApp',[]);

google.charts.load('current', {'packages': ['geochart']});


page.controller("tweetsController",["$scope", "$http", function($scope, $http) {
  
// starts the search variable as empty
  $scope.search = "";
  
  // sets default count to 20
  $scope.count = 20;

  // hide tweet application
  $('#twitter-app').hide();

  // hide visualization application
  $('#visualization-app').hide();

  // only display certain steps
  $scope.chart = true;
  $scope.t = false;
  $scope.step1 = true;
  $scope.step2 = false;
  $scope.step3 = false;
  $scope.step4 = false;
 
  // hide landing page on click
  // show twitter app
  $('#hide-landing-page').on('click', function() {
    $('#landing-page').hide();
    $('#twitter-app').show();
  });

  // hide landing page on click
  // show visualization app
  $('#go-to-charts').on('click', function() {
    $('#landing-page').hide();
    $('#visualization-app').show();
  });

  // function to get tweets
  $scope.newQuery = function() {
    // document.getElementById("instructions").style.display = "none";
    document.getElementById("loading").style.display = "";
    var url = "/tweets";

    var query = {
      search: $scope.search,
      count: $scope.count
    };

    // gets the tweets from twitter
    $http.get(url, {params:query}).then(function(response) {
      // puts the tweets in the scope from the controller
      document.getElementById("loading").style.display = "none";
      // function to help parse the date from the tweets 
      $scope.mySplit = function(string, nb) {
        var array = string.split(" ");
        return array[nb];
      }
    // only display certain steps
    $scope.step1 = false;
    $scope.step2 = true;
    });
  };

  $scope.buildDB = function() {
    $http.get('/build').success(function(data) {
      // alert user that database was created
      $scope.building = data.building;
      swal("Success", data.building, "success");
    });
    // only display certain steps
    $scope.step2 = false;
    $scope.step3 = true;
  };

  $scope.readDB = function() {
    // gets the file type from the user
    $http.get('/read').then(function(response) {
      // get tweets
      $scope.tweets = response.data;

      // function to help parse the date from the tweets 
      $scope.mySplit = function(string, nb) {
        var array = string.split(" ");
        return array[nb];
      }
    });
    // only display certain steps
    $scope.t = true;
    $scope.step3 = false;
    $scope.step4 = true;
  };

  $scope.exportInfo = function() {
    // gets the file type from the user
    $.post('/export', {etype: $scope.etype, fName: $scope.fName});
    $http.get('/export').success(function(data) {
      // gets the alert text from the node server
      $scope.myJSON = data.myJSON;
      $scope.myCSV = data.myCSV;
      $scope.myXML = data.myXML;
      // post the JSON alert if the user chooses JSON
      if ($scope.etype == 'JSON') {
        swal("Success", data.myJSON, "success");
      }
      // post the CSV alert if the user chooses CSV
      else if ($scope.etype == 'CSV') {
        swal("Success", data.myCSV, "success");
      }
      // post the XML alert if the user chooses XML
      else if ($scope.etype == 'xml') {
        swal("Success", data.myXML, "success");
      }
    });
  };

  // function to load intial chart and then reload at set interval
  function setIntervalAndExecute(fn, t) {
    fn();
    return(setInterval(fn, t));
  }

  // function to get chart information
  $scope.chartsInfo = function() {

    // bar graph
    var bar = function () {
      $.get( "/overall", success, "json" );
      function success(dat){
        // set variables
        var stuff = [dat[0], dat[1], dat[2]];
        var ctx = document.getElementById("politics");
        var politics = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ["Trump", "Hillary", "Bernie"],
              datasets: [{
                  label: '# of Tweets About Canidates',
                  data: stuff,
                  backgroundColor: "#F7B3DA"
              }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero:true
                }
              }]
            }
          }
        });
      }
    }
    
    // call bar graph and reload every 2 seconds
    var interval = setIntervalAndExecute(bar, 2000);

    // pie graph
    var pie = function () {
      $.get( "/source", success, "json" );
      function success(mop){
        var temp = [0,0,0,0];
        for (var sourceT in mop) {
          var value = mop[sourceT];
          // set variables
          if (sourceT == "Twitter Web Client") {
            temp[0] = value;
          } else if (sourceT == "Twitter for iPhone") {
            temp[1] = value;
          } else if (sourceT == "Twitter for Android") {
            temp[2] = value;
          } else {
            temp[3] += value;
          }
          
        }
        var ctxx = document.getElementById("device");
        var data = {
            datasets: [{
                data: temp,
                backgroundColor: [
                    "#9AD5CA",
                    "#ACDDE7",
                    "#ADB9E3",
                    "#F7B3DA"
                ]
            }],
            labels: [
                "Twitter Web Client",
                "Twitter for iPhone",
                "Twitter for Android",
                "Other"
            ]
        };

        // for a pie chart
        var device = new Chart(ctxx,{
            type: 'pie',
            data: data
        });
      }
    }
    
    // call pie chart and reload every 4 seconds
    var interval2 = setIntervalAndExecute(pie, 4000);
      
    var lol = [];

    // map chart
    var map = function () {
      $.get( "/map", success, "json" );
      function success(kas){
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var liveTweets = new google.visualization.DataTable();
            // set columns
            liveTweets.addColumn('number', 'Latitude');
            liveTweets.addColumn('number', 'Longitude');
            liveTweets.addColumn('string', 'User');
            liveTweets.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});
            
            // set options
             var options = {
                backgroundColor : 'transparent',
                tooltip: {isHtml: true},
                width : 500,
                height : 400,
                region : 'US',
                displayMode : 'markers',
                resolution : 'provinces',
                magnifyingGlass : {enable : 'false'},
                tooltip: {textStyle: {fontName: 'BenchNine', fontSize: 14}},
            }
            
            var chart = new google.visualization.GeoChart(document.querySelector('#map'));
            
            // push data into array
            for (var st in kas) {
              var value = kas[st];
              lol.push([value.lat[1], value.lat[0], st, value.text]);  
            }

            // add array as a rows
            liveTweets.addRows(lol);

            // update the map
            chart.draw(liveTweets, options);
          }   
      }
    }

    // call map chart and reload every 10 seconds
    var interval3 = setIntervalAndExecute(map, 10000);
  };
    
}]); // close controller
