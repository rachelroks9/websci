// jQuery(document).ready(function($) {
  
// }

var page = angular.module('quizApp',[]);

page.controller("quizController",["$scope", "$http", function($scope, $http) {
  $scope.displayD = false;
  

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(gotLocation);
    } else {
      $('main').append('Geolocation is not supported by this browser :(');
    }
  }

  function gotLocation (pos) {
    $scope.currPos = pos.coords;
    console.log($scope.currPos);
    // console.log(pos.coords);
  }

  $scope.go = function() {
    var url = "/go";

    getLocation();
    $scope.currPos = {};

    var cur = $scope.currPos;
    console.log(cur);
    var zipcodes = {};
    console.log();

    $http.get(url, {zip:zipcodes}).then(function(response) {
      $scope.displayD = true;
      // show display button
    });
  };
  

}]);