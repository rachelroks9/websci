var app = angular.module('lab4',[]);

app.controller("mainController",["$scope", "$http", function($scope, $http){
  // set empty variables
  $scope.tweets = [];
  $scope.searchInfo = "";

  $scope.queryTweet = function () {
    var url = "get_tweets.php";
    // If there is a query, put in url
    if ($scope.searchInfo != "") {
        url += "?q=" + $scope.searchInfo;
    }
    $http.get(url).then(function(response){
      // assign tweets to scope
      $scope.tweets = response.data.statuses;
      var output = '';
      // find hashtags associated with tweets
      $scope.hashtags = [];
      for (var i=0; i < $scope.tweets.length; i++) {
        var tweet = $scope.tweets[i];
        if (tweet.entities.hashtags && tweet.entities.hashtags.length !=0) {
          things = tweet.entities.hashtags;
          for (var l=0; l < things.length; l++) {
            $scope.hashtags.push(tweet.entities.hashtags[l].text);
          }
        }
      }
    });
  };

  // Upon initial page, load data
  $scope.queryTweet();

  // When enter button is pressed in search, should call query tweet function
  $scope.Enter = function (enterPressed) {
    if (enterPressed.which === 13) {
        $scope.queryTweet();
    }
};

}])