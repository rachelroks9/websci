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
      function (error) { 
        // display error if geolocation disabled
        if (error.code == error.PERMISSION_DENIED)
          $('#error').html('Geolocation is not supported by this browser.');
      });
    } else {
      // display error if geolocation disabled
      console.log('error');
      $('#error').html('Geolocation is not supported by this browser.');
    }
  }
  
  // use Forecast.io weather api to get weather data
  function getWeather(lat, lon) {
    var apiKey = '7cd12e1447b6720f030a8dd9b0ae126c';
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
    
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + apiKey;
    // console.log(url);

    // call api using ajax
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'jsonp',
      error: function(jqXHR, Status, ErrorThrown) {
        var htmlString =  'An error has occured when finding your weather.<br> Please press the refresh button to try again.<br>' + ErrorThrown;
        $('#error').html(htmlString);
      },
      success: function(data) {
        displayWeather(data);
      }
    });
  }
  
  // display weather information in browser
  function displayWeather(data) {
    // get and display location name
    getLocationName(data.coord.lat, data.coord.lon);
    
    // display weather icon
    var imageLinkWeb = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    var imgLink = '<img src = "' + imageLinkWeb + '">';
    $('#weather-pic').html(imgLink);
    // console.log(data.main.temp);

    // display temperature
    var kelvin = data.main.temp;
    var far = kelvin * (9/5) - 459.67;
    var cel = kelvin - 273.15;
    
    $('#degrees').html((far).toFixed(1) + ' &deg;F');
    // $('#degrees').html((cel).toFixed(1) + ' &deg;C');
    var hum = data.main.humidity;

    var feelsLike = 
      - 42.38 
      + (2.049*far)
      + (10.14*hum) 
      - (0.2248*far*hum) 
      - (0.006838*(far*far)) 
      - (0.05482*(hum*hum)) 
      + (0.001228*(far*far)*hum) 
      + (0.0008528*far*(hum*hum)) 
      - (0.00000199*(far*far)*(hum*hum));
    console.log(far);
    console.log(hum);
    console.log(feelsLike);
    // display feels like
    $('#feels-like').html('Feels like ' + (feelsLike).toFixed(1) + ' &deg;F');
    
    // display weather description
    $('#description').html(data.weather[0].description);
    
    // display prepitation info
    var precip = data.currently.precipProbability;
    if (precip > 0) { // only show precipitation type if it's > 0
      $('#precip').html((precip * 100).toFixed(2) + '% chance of ' + data.currently.precipType);
    } else {
      $('#precip').html('0% chance of precipitation');
    }
    
    // display wind and humidity
    $('#wind').html('Wind: ' + data.currently.windSpeed + 'mph');
    $('#humidity').html('Humidity: ' + (data.currently.humidity * 100) + '%');
  }
  
  // get and display location name using Google's Geocode API
  // forecast.io does not retrieve location name information
  function getLocationName(lat, lon) {
    var latlng = new google.maps.LatLng(lat, lon);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({location:latlng},function(result){
      // index in address array
      var cityIndex = 2;
      var stateIndex = 4;
      
      var city = result[0].address_components[cityIndex].long_name;
      var state = result[0].address_components[stateIndex].short_name;
      
      // sometimes city and state are at different indexes depending on what info google can retrieve
      if (state.length > 2) {
        city = result[0].address_components[cityIndex + 1].long_name;
        state = result[0].address_components[stateIndex + 1].short_name;
      }
      
      // display city and state
      $('#city').html(city + ', ' + state);
    });
  }
  
  // refresh weather information without refreshing browser
  $('#refresh').on('click', function() {
    $('#weather-box').animate({opacity: 0}, 300);
    getCoords();
    $('#weather-box').animate({opacity: 1}, 2000);
  });
  
  
});