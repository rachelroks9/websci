/* This function checks to see if there is a broken
image link. If there is a broken image link it is 
replaced with the default picture */
function imgError(image) {
  image.onerror = '';
  image.src = 'defaultpic.jpg';
  return true;
}

$(document).ready(function() {
  var url = "tweetsFromTwitter.json";
  $.ajax({
    type: "GET",
    url: url,
    dataType: 'json',
    error: function(jqXHR, Status, ErrorThrown) {
      alert("Could not load file: " + ErrorThrown);
    },
    success: function (data) {
      // make new array called tweets with info I want
      var tweets = [];
      $.each(data, function(i, item) {
        // create temp array for each tweet
        var temp = [];

        // tweet time & date
        temp.push(item.created_at.split('+')[0]);

        // tweet 
        temp.push(item.text);

        // username
        temp.push(item.user.screen_name);

        // profile picture
        temp.push(item.user.profile_image_url);

        // put to large array of all info
        tweets.push(temp);
      });

      // make new array called hashtags with all hashtags
      var hashtags = [];
      $.each(data, function(i, item) {
        // check to see if hashtags exists and then if it is not empty
        if (item.entities.hashtags && item.entities.hashtags.length !=0) {
          things = item.entities.hashtags;
          $.each(things, function(t, thing) {
            hashtags.push(item.entities.hashtags[t].text);
          });
        }
      });

      // create html div for all tweets
      var output = '';
      $.each(tweets, function(i, tweet) {
        output += '<div class="well">';
        
        // profile picture
        output += '<img style = "float:left"';
        output += 'class ="img-circle"';
        output += 'src=';
        output += tweet[3];
        output += ' onError="imgError(this);"';
        output += 'width=48 height=48';
        output += ' >';

        // username
        output += '<div class="lead text-left">';
        output +=   '<a href="http://twitter.com/' + tweet[2] + '">';
        output +=     tweet[2];
        output +=   '</a>';
        output += '</div>';

        // tweet time & date
        output += '<div class="text-right text-small text-muted">';
        output += tweet[0];
        output += '</div>';
        
        // tweet
        output += '<div class="text-primary">';
        output +=   '<p>' + tweet[1] + '</p>';
        output += '</div>';

        output += '</div>';
      });

      // create html div for all hashtags
      var tag = '';
      $.each(hashtags, function(i, hashtag) {
        tag += '<div class="well">';

        // hashtag link 
        tag += '<div class="lead text-center">';
        tag += '<a href="https://twitter.com/search?q=%23' + hashtag + '">';
        tag += '#';
        tag +=     hashtag;
        tag +=   '</a>';
        tag += '</div>';

        tag += '</div>';
      });

      // show only 5 tweets at a time, changing every 3 seconds
      
      var interval = 5; 
      $('#tweets').html(output);
      if (interval == 5) {
      $('#tweets .well').slice(0, 5).show();
    }
      // 1000 milliseconds = 1 seconds, change every 3 seconds
      var freq = 3000; 
      // show 5 tweets at a time
      
      setInterval(function() {
        if (interval == 150) {
          $('#tweets .well').slice(interval - 5, interval).hide();
          interval = 5;
        } else {
          $('#tweets .well').slice(interval - 5, interval).hide();
          interval = interval + 1;
        }
        $('#tweets .well').slice(interval-5, interval).slideDown('fast');
      }, freq);

      // show only 7 hashtags at a time, changing every 5 seconds
      $('#hashtags').html(tag);
      $('#hashtags .well').slice(0, 7).show();
      // 1000 milliseconds = 1 seconds, change every 5 seconds
      var freq = 5000; 
      // show 7 hashtags at a time
      var num = 7; 
      setInterval(function() {
        if (num == 150) {
          $('#hashtags .well').slice(num - 7, num).hide();
          num = 7;
        } else {
          $('#hashtags .well').slice(num - 7, num).hide();
          num = num + 1;
        }
        $('#hashtags .well').slice(num-7, num).slideDown('fast');
      }, freq);

    } // closes sucess function
  });
});