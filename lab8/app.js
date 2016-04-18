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
    $http.get(url).then(function(response) {
      // puts the tweets in the scope from the controller
      document.getElementById("loading").style.display = "none";
      document.getElementById("results").style.display = "inline";

      $scope.stuff = response.data;
      // function to help parse the date from the tweets 
      $scope.mySplit = function(string, nb) {
        var array = string.split(" ");
        return array[nb];
      }
    });
  };


}]);