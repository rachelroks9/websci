var page = angular.module('tweetsApp',[]);

page.controller("tweetsController",["$scope", "$http", function($scope, $http) {
  //starts the search variable as empty
  $scope.search = "";
  $scope.count = 20;
 

  $scope.newQuery = function() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("loading").style.display = "";
    var url = "/tweets";

    var query = {
      search: $scope.search,
      count: $scope.count
    };

    //gets the tweets from twitter
    $http.get(url, {params:query}).then(function(response) {
      //puts the tweets in the scope from the controller
      $scope.tweets = response.data;
      document.getElementById("loading").style.display = "none";
      //function to help parse the date from the tweets (used in the html)
      $scope.mySplit = function(string, nb) {
        var array = string.split(" ");
        return array[nb];
      }
    });
  };
  
  $scope.exportInfo = function() {
    //gets the file type from the user
    $.post('/export', {etype: $scope.etype});
    $http.get('/export').success(function(data) {
      //gets the alert text from the node server
      $scope.myJSON = data.myJSON;
      $scope.myCSV = data.myCSV;
      //post the JSON alert if the user chooses JSON
      if ($scope.etype == 'JSON') {
        alert(data.myJSON);
      }
      //post the CSV alert if the user chooses CSV
      else if ($scope.etype == 'CSV') {
        alert(data.myCSV);
      }
    });
  };

  $scope.buildDB = function() {
    //gets the file type from the user
    $.post('/build', {etype: $scope.select});
    $http.get('/build').success(function(data) {
      
    });
  };

  $scope.readdDB = function() {
    //gets the file type from the user
    $.post('/read', {etype: $scope.select});
    $http.get('/read').success(function(data) {
      
    });
  };

   $scope.xmlEx = function() {
    //gets the file type from the user
    $.post('/xml', {fName: $scope.fName});
    $http.get('/xml').success(function(data) {
      
    });
  };

}]);