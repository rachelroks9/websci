// create app module and set up socket
tweetsApp = angular.module('tweetsApp', ['btford.socket-io'])
  .factory('socket', function(socketFactory) {
    return socketFactory({
      ioSocket: io.connect('http://localhost:3000')
    });
  });

// controller for app
tweetsApp.controller('tweetsController', ['$scope', 'socket', '$log', function($scope, socket, $log) {
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

  // saved JSON file
  $scope.jsonSaved = ""; 

  // saved CSV file
  $scope.csvSaved = ""; 

  // text when file saved
  $scope.saveText = "";

  // default do not export document
  $scope.Export = false;

  // total count of tweets pulled so far
  $scope.totalCount = 0;

  // old query
  var old_query = '';

  // when new query is submitted
  $scope.newQuery = function(count, q, type, ex) {
    // reset showing instructions to false
    $scope.showInstruct = false;

    // set number of tweets
    $scope.tweetCount = count; 

    // show waiting spinner
    $scope.showWait = true; 

    // show save text
    $scope.showSave = false;

    // set tweets objects
    $scope.tweets = {};

    // set type of document to export
    $scope.type = type;

    // set if exporting to document
    $scope.Export = ex;

    // check if new query is different than previous query
    // remove old query info
    if (old_query !== '') {
      socket.emit('remove', old_query);
    }

    // tell server to get tweets about q
    socket.emit('q', q);

    // tweets list of specific query
    $scope['tweets_' + q] = [];

    // total count of tweets pulled so far
    $scope.totalCount = 0;

    // if export button is pressed, check if file already exists
    if ($scope.Export == true) {
        existsCheck (count, q, type);
      } 

    // when new tweet comes in
    socket.on('tweet_', function(tweet) {
      $scope.totalCount++;

      // stop search if correct # of tweets have come in
      if ($scope.totalCount == $scope.tweetCount) {
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
        }
      }

      // update tweets list when new tweet comes in
      $scope.tweets = $scope['tweets_' + q];

      // if export button is pressed, execute export function
      if ($scope.Export == true) {
        exportInfo (count, q, type);
      } 
    });

    old_query = q;
    $scope.totalCount = 0;
  }

  // when new query submited
  $scope.submit = function($event) {
    // if you press enter
    if ($event.which !== 13) return;
    if ($scope.tweetCount) {
      $scope.newQuery($scope.tweetCount, $scope.query)
    }
  }

  // for when you need to export tweets
  function exportInfo (count, q, type) {
    // if file type is JSON
    if ($scope.type == "JSON") {
      socket.emit('json', $scope.tweets);
    // if file type is CSV
    } else if ($scope.type == "CSV") {
      socket.emit('save_csv', $scope.tweets, "ITWS4500-S16-blackr2-tweets.csv");
    }
  }

  function existsCheck (count, q, type) {
    // if file type is JSON
    if ($scope.type == "JSON") {
      socket.emit('jsonExists', $scope.tweets);
      // check if file exists
      socket.on('exists_', function(data) {
        $scope.jsonSaved = data.saved;
        if ($scope.jsonSaved == "exists") {
          $scope.saveText = "A JSON file was previously created. It has been updated with the following tweets."
        } else if ($scope.jsonSaved == "not") {
          $scope.saveText = "A JSON file was created with the following tweets."
        }
      });
    // if file type is CSV
    } else if ($scope.type == "CSV") {
      socket.emit('csvExists', $scope.tweets);
      // check if file exists
      socket.on('exists_', function(data) {
        $scope.csvSaved = data.saved;
        if ($scope.csvSaved == "exists") {
          $scope.saveText = "A CSV file was previously created. It has been updated with the following tweets."
        } else if ($scope.csvSaved == "not") {
          $scope.saveText = "A CSV file was created with the following tweets."
        }
      });
    }

    // show saved text on html
    $scope.showSave = true;
  }


}]);