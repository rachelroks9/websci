var app = angular.module('quiz1',[]);

app.controller("mainController",["$scope", "$http", function($scope, $http){
  $scope.getWeather = function () {
    // this will cause an error becuase it does not know what the variable weather is. This can be fixed when you connect the server.js and app.js
    var temp = (weather.currently.temperature).toFixed(1) + ' &deg;F';

    // create an output sentence depending on the temperature
    var output = "";
    if (temp < 10) {
      output = "Currently it is freezing in Spokane, WA.";
    } else if (temp < 40 && temp >= 10) {
      output = "Currently it is cold in Spokane, WA.";
    } else if (temp < 70 && temp >= 40) {
      output = "Currently it is warm in Spokane, WA.";
    } else if (temp >= 70) {
      output = "Currently it is hot in Spokane, WA.";
    }
  };
      
}]);