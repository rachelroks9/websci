var page = angular.module('tweetsApp',[]);

page.controller("tweetsController",["$scope", "$http", function($scope, $http) {
// starts the search variable as empty
  $scope.search = "";
  
  // sets default count to 20
  $scope.count = 20;

  // hide main application
  $('#twitter-app').hide();

  // only display certain steps
  $scope.t = false;
  $scope.step1 = true;
  $scope.step2 = false;
  $scope.step3 = false;
  $scope.step4 = false;
 
  // hide landing page up click
  $('#hide-landing-page').on('click', function() {
    $('#landing-page').hide();
    $('#twitter-app').show();
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

}]);