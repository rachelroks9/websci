var page = angular.module('sparqlApp',[]);

page.controller("sparqlController",["$scope", "$http", function($scope, $http) {
  //starts the search variable as empty
  $scope.stuff = "";
  // $scope.search = "";

  $scope.initial = "SELECT DISTINCT ?school ?campusSize ?averageClassSize WHERE { \
        ?school a dbo:School; \
        dbo:campusSize ?campusSize; \
        dbo:averageClassSize ?averageClassSize. \
    } ORDER BY DESC(?campusSize) \
    LIMIT 10";

  // $scope.newQuery = function() {
  //   document.getElementById("loading").style.display = "";
  //   var url = "/search";

  //   var query = { search: $scope.search };

  //   //gets the tweets from twitter
  //   $http.get(url, {params:query}).then(function(response) {
  //     //puts the tweets in the scope from the controller
  //     $scope.tweets = response.data;
  //     document.getElementById("loading").style.display = "none";
  //     //function to help parse the date from the tweets (used in the html)
  //     $scope.mySplit = function(string, nb) {
  //       var array = string.split(" ");
  //       return array[nb];
  //     }
  //   });
  // };

}]);