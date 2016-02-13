$(document).ready(function() {
    
  // get weather information
  getCoords();
  
  // get coordinates of user's location 
  function getCoords() {
    // check if browser has geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        getWeather(lat, lon);
      },
      // display error if geolocation disabled
      function (error) { 
        if (error.code == error.PERMISSION_DENIED)
          $('#error').html('Geolocation is not supported by this browser.');
      });
    } else {
      // display error if geolocation disabled on website and console
      console.log('error');
      $('#error').html('Geolocation is not supported by this browser.');
    }
  }
  
  // use Forecast.io weather api to get weather data
  function getWeather(lat, lon) {
    var apiKey = '28800f821fc34338b45c29ca07407a40';
    var url = 'https://api.forecast.io/forecast/' + apiKey + '/' + lat + ',' + lon;

    // call api using ajax
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'jsonp',
      error: function(jqXHR, Status, ErrorThrown) {
        var htmlString =  'An error has occured when finding your weather :( <br>' + ErrorThrown;
        $('#error').html(htmlString);
      },
      success: function(info) {
        displayWeather(info);
      }
    });
  }

  // display weather information in browser
  function displayWeather(info) {
    // get and display location name
    getLocationName(info.latitude, info.longitude);

    // display weather icon
    var icon = info.currently.icon;
    var skycons = new Skycons({"color": "purple"});
    skycons.set("iconToday", icon);
    skycons.play();

    // display weather temperature and "feels like" temperature
    $('#degrees').html((info.currently.temperature).toFixed(1) + ' &deg;F');
    $('#feels-like').html('Feels like ' + (info.currently.apparentTemperature).toFixed(1) + ' &deg;F');
    
    // display weather description
    $('#description').html(info.currently.summary);
    
    // display prepitation info
    var precip = info.currently.precipProbability;
    if (precip > 0) { // only show precipitation type if it's > 0
      $('#precip').html((precip * 100).toFixed(2) + '% chance of ' + info.currently.precipType);
    } else {
      $('#precip').html('0% chance of precipitation');
    }
    
    // display wind and humidity
    $('#wind').html('Wind: ' + info.currently.windSpeed + ' mph');
    $('#humidity').html('Humidity: ' + (info.currently.humidity * 100) + '%');

    // call function to display weekly forecast
    display6day(info);
  }
  
  // display weeks forecast
  function display6day(info) {
    // get todays date information
    var today = new Date();
    var daynum = today.getDay();

    // change weekly index to day names
    var weekday = new Array(7);
      weekday[0]=  "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

    var fday = [];
    for (i=0; i < 6; i++) {
      if (daynum == 6) {
        daynum = 0;
      } else {
       daynum ++; 
      }
      fday.push(weekday[daynum]);
    }

    // each days information for weekly forecast
    var day1 = '';
    day1 += '<div class ="well well-sm">';
    day1 += '<div class = "lead">';
    day1 += fday[0];
    day1 += '</div>';
    day1 += '<div class = "primary">';
    day1 += info.daily.data[1].summary + '<br />';
    day1 += '</div>';
    day1 += '<div class = "text-info">';
    day1 += 'Min: ' + info.daily.data[1].temperatureMin.toFixed(1) + ' &deg;F' + '<br />';
    day1 += 'Max: ' + info.daily.data[1].temperatureMax.toFixed(1) + ' &deg;F' + '<br />';
    day1 += '</div>';
    day1 += '</div>';

    var day2 = '';
    day2 += '<div class ="well well-sm">';
    day2 += '<div class = "lead">';
    day2 += fday[1];
    day2 += '</div>';
    day2 += '<div class = "primary">';
    day2 += info.daily.data[2].summary + '<br />';
    day2 += '</div>';
    day2 += '<div class = "text-info">';
    day2 += 'Min: ' + info.daily.data[2].temperatureMin.toFixed(1) + ' &deg;F' + '<br />';
    day2 += 'Max: ' + info.daily.data[2].temperatureMax.toFixed(1) + ' &deg;F' + '<br />';
    day2 += '</div>';
    day2 += '</div>';

    var day3 = '';
    day3 += '<div class ="well well-sm">';
    day3 += '<div class = "lead">';
    day3 += fday[2];
    day3 += '</div>';
    day3 += '<div class = "primary">';
    day3 += info.daily.data[3].summary + '<br />';
    day3 += '</div>';
    day3 += '<div class = "text-info">';
    day3 += 'Min: ' + info.daily.data[3].temperatureMin.toFixed(1) + ' &deg;F' + '<br />';
    day3 += 'Max: ' + info.daily.data[3].temperatureMax.toFixed(1) + ' &deg;F' + '<br />';
    day3 += '</div>';
    day3 += '</div>';

    var day4 = '';
    day4 += '<div class ="well well-sm">';
    day4 += '<div class = "lead">';
    day4 += fday[3];
    day4 += '</div>';
    day4 += '<div class = "primary">';
    day4 += info.daily.data[4].summary + '<br />';
    day4 += '</div>';
    day4 += '<div class = "text-info">';
    day4 += 'Min: ' + info.daily.data[4].temperatureMin.toFixed(1) + ' &deg;F' + '<br />';
    day4 += 'Max: ' + info.daily.data[4].temperatureMax.toFixed(1) + ' &deg;F' + '<br />';
    day4 += '</div>';
    day4 += '</div>';

    var day5 = '';
    day5 += '<div class ="well well-sm">';
    day5 += '<div class = "lead">';
    day5 += fday[4];
    day5 += '</div>';
    day5 += '<div class = "primary">';
    day5 += info.daily.data[5].summary + '<br />';
    day5 += '</div>';
    day5 += '<div class = "text-info">';
    day5 += 'Min: ' + info.daily.data[5].temperatureMin.toFixed(1) + ' &deg;F' + '<br />';
    day5 += 'Max: ' + info.daily.data[5].temperatureMax.toFixed(1) + ' &deg;F' + '<br />';
    day5 += '</div>';
    day5 += '</div>';

    var day6 = '';
    day6 += '<div class ="well well-sm">';
    day6 += '<div class = "lead">';
    day6 += fday[5];
    day6 += '</div>';
    day6 += '<div class = "primary">';
    day6 += info.daily.data[6].summary + '<br />';
    day6 += '</div>';
    day6 += '<div class = "text-info">';
    day6 += 'Min: ' + info.daily.data[6].temperatureMin.toFixed(1) + ' &deg;F' + '<br />';
    day6 += 'Max: ' + info.daily.data[6].temperatureMax.toFixed(1) + ' &deg;F' + '<br />';
    day6 += '</div>';
    day6 += '</div>';

    // add days information into HTML
    $('.day1').html(day1);
    $('.day2').html(day2);
    $('.day3').html(day3);
    $('.day4').html(day4);
    $('.day5').html(day5);
    $('.day6').html(day6);
  }


  // forecast.io doesn't give state information, only city
  // using Google's Reverse Geocode API to get location name
  function getLocationName(lat, lon) {
    var latlng = new google.maps.LatLng(lat, lon);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({location:latlng},function(result){
      // index in address array
      var cityIndex = 2;
      var stateIndex = 4;
      
      // city and state name
      var city = result[0].address_components[cityIndex].long_name;
      var state = result[0].address_components[stateIndex].short_name;
      
      // depending on what info google can retrieve, someitme the city and state are differnet indexes
      if (state.length > 2) {
        city = result[0].address_components[cityIndex + 1].long_name;
        state = result[0].address_components[stateIndex + 1].short_name;
      }
      
      // display city and state for current location
      $('#city').html(city + ', ' + state);
    });
  }
  
  // refresh current weather information but don't refresh browser
  $('#refresh').on('click', function() {
    $('#weather-box').animate({opacity: 0}, 300);
    getCoords();
    $('#weather-box').animate({opacity: 1}, 2000);
  });
  
});