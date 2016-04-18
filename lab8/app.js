var page = angular.module('sparqlApp',[]);

page.controller("sparqlController",["$scope", "$http", function($scope, $http) {
  // starts the search variable as empty
  $scope.search = 
  "SELECT DISTINCT ?school ?campusSize ?averageClassSize WHERE {" +
    '\n \t' + "?school a dbo:School;" +
    '\n \t' + "dbo:campusSize ?campusSize;" +
    '\n \t' + "dbo:averageClassSize ?averageClassSize." +
  '\n' + "} ORDER BY DESC(?campusSize)" +
  '\n' + "LIMIT 10";
  
  // sets default count to 20
  $scope.count = 20;
 
  // function to get tweets
  $scope.newQuery = function() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("loading").style.display = "";
    var url = "/query";

    $.post(url, {search: $scope.search});

    // gets the tweets from twitter
    $http.get(url).success(function(response) {
      // puts the tweets in the scope from the controller
      document.getElementById("loading").style.display = "none";
      // // function to help parse the date from the tweets 
      // $scope.mySplit = function(string, nb) {
      //   var array = string.split(" ");
      //   return array[nb];
      // }
    });
  };
  
  $scope.exportInfo = function() {
    // gets the file type from the user
    $.post('/export', {etype: $scope.etype});
    $http.get('/export').success(function(data) {
    });
  };

  $scope.buildDB = function() {
    $http.get('/build').success(function(data) {
      
    });
  };

  $scope.readDB = function() {
    // gets the file type from the user
    $http.get('/read').then(function(response) {
      
    });
  };

   $scope.xmlEx = function() {
    // gets the file type from the user
    $.post('/xml', {fName: $scope.fName});
 
    $http.get('/xml').success(function(data) {
      
    });
  };

}]);