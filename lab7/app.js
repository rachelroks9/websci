var page = angular.module('tweetsApp',[]);

page.controller("tweetsController",["$scope", "$http", function($scope, $http) {
  // starts the search variable as empty
  $scope.search = "";
  
  // sets default count to 20
  $scope.count = 20;
 
  // function to get tweets
  $scope.newQuery = function() {
    document.getElementById("instructions").style.display = "none";
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
    });
  };
  
  $scope.exportInfo = function() {
    // gets the file type from the user
    $.post('/export', {etype: $scope.etype});
    $http.get('/export').success(function(data) {
      // gets the alert text from the node server
      $scope.myJSON = data.myJSON;
      $scope.myCSV = data.myCSV;
      // post the JSON alert if the user chooses JSON
      if ($scope.etype == 'JSON') {
        alert(data.myJSON);
      }
      // post the CSV alert if the user chooses CSV
      else if ($scope.etype == 'CSV') {
        alert(data.myCSV);
      }
    });
  };

  $scope.buildDB = function() {
    $http.get('/build').success(function(data) {
      // alert user that database was created
      $scope.building = data.building;
      alert(data.building);
    });
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
  };

   $scope.xmlEx = function() {
    // gets the file type from the user
    $.post('/xml', {fName: $scope.fName});
 
    $http.get('/xml').success(function(data) {
      // alert user that XML file was created
      $scope.myXML = data.myXML;
      alert(data.myXML);
    });
  };

}]);