// create app module and set up socket
tweetsApp = angular.module('tweetsApp', ['btford.socket-io'])
  .factory('socket', function(socketFactory) {
    return socketFactory({
      ioSocket: io.connect('http://localhost:3000')
    });
  });

// controller for app
tweetsApp.controller('tweetsController', ['$scope', 'socket', function($scope, socket) {
  // show instructions
  $scope.showInstruct = true;

  // show waiting spinner
  $scope.showWait = false; 

  // # of tweets to pull, default set to 20 tweets
  $scope.tweetCount = 20; 

  // list of JSON tweet objects
  $scope.tweets = {}; 

  // list of hashtags associated with tweets
  $scope.hashtags = [];

  // old query
  var old_query = '';

  // when new query is submitted
  $scope.newQuery = function(count, q) {
    // reset showing instructions to false
    $scope.showInstruct = false;

    // set number of tweets
    $scope.tweetCount = count; 

    // show waiting spinner
    $scope.showWait = true; 

    // set tweets objects
    $scope.tweets = {};

    // check if new query is different than previous query
    // remove old query info
    if (old_query !== '') {
      socket.emit('remove', old_query);
    }

    // pull tweets
    getTweets(count, q);
    old_query = q;
  }

  // when new query submited
  $scope.submit = function($event) {
    // if you press enter
    if ($event.which !== 13) return;
    if ($scope.tweetCount) {
      $scope.newQuery($scope.tweetCount, $scope.query)
    }
  }

  /*PRIVATE*/

  // update tweets list when new tweet comes in
  function updateScope(q) {
    $scope.tweets = $scope['tweets_' + q];
  }

  // pull tweets about query
  function getTweets(count, q) {
    // tell server to get tweets about q
    socket.emit('q', q);

    // tweets list of specific query
    $scope['tweets_' + q] = [];

    // total count of tweets pulled so far
    var totalCount = 0;

    // when new tweet comes in
    socket.on('tweet_', function(tweet) {
      totalCount++;

      // save file if count # of tweets have come in
      if (totalCount == count) {
        socket.emit('limit_reached', count, q);
      }

      // hide instructions and waiting spinner
      $scope.showInstruct = false;
      $scope.showWait = false;

      $scope['tweets_' + q] = $scope['tweets_' + q].concat(tweet);

      // pull hashtags
      if (tweet.entities.hashtags && tweet.entities.hashtags.length !=0) {
        things = tweet.entities.hashtags;
        for (var l=0; l < things.length; l++) {
          $scope.hashtags.push(tweet.entities.hashtags[l].text);
          console.log($scope.hashtags);
        }
      }

      // update tweets list and display
      updateScope(q);
    });
  }
}]);