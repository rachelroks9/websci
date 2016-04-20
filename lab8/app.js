var page = angular.module('sparqlApp',[]);

page.controller("sparqlController",["$scope", "$http", function($scope, $http) {
  // starts the search variable as default query
  $scope.search = 
  "SELECT DISTINCT ?school ?campusSize ?averageClassSize WHERE {" +
    '\n \t' + "?school a dbo:School;" +
    '\n \t' + "dbo:campusSize ?campusSize;" +
    '\n \t' + "dbo:averageClassSize ?averageClassSize." +
  '\n' + "} ORDER BY DESC(?campusSize)" +
  '\n' + "LIMIT 10";
 
  // function to get query results
  $scope.newQuery = function() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("loading").style.display = "";
    
    var url = "/query";

    // send the query to the backend
    $.post(url, {search: $scope.search});

    // gets the results
    $http.get(url).then(function(response) {
      // hides loading circle, displays results
      document.getElementById("loading").style.display = "none";
      document.getElementById("results").style.display = "inline";
    
      // if there is no error
      if (response.status != 500) {
        // puts the results in the scope from the controller
        $scope.stuff = response.data;
        $scope.headers = [$scope.stuff[0][0], $scope.stuff[0][1], $scope.stuff[0][2]];
      }
      
    });
  };

}]);