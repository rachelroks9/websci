Rachel Blacker
Web Science Systems Development
Spring 2016
Lab 2: APIs


For this lab I initially used OpenWeather’s API. I then found that is was much more restricted than I wanted. With Open Weather I could not get the “feels like” temperature or the weekly weather forecast. I then switched over to Forecast.io’s API which had all of these things.

I first ask the user if I can use their current location to display the weather. If the user does not allow their location to be used, then an error message is displayed. If I can use the location, I call the Forecast.io API and get the current weather information and the weekly forecast. A refresh button is at the bottom of the page that refreshes all of the current weather information without causing the page to load. It should be noted that the refresh button does not change the weekly forecast information.

One limitation for Forecast.io is that it does not display the city and state information of the coordinates. To get around this I found that I could use Google’s Geocode API reverse lookup. A benefit of using Forecast.io is that they have animated icons for each weather description. I integrated their icons into my website, which was easy once I read up on the documentation. 

For the weekly forecast I used Bootstrap to show the next 6 days forecast. Parsing the data for the weekly forecast took a bit because I used “data” as a variable but then it was used in the JSON file so I had to change this to “info”. Overall, I found this lab to be interesting and decently easy once I was able to parse the information correctly.


Resources:
http://www.w3schools.com/html/html5_geolocation.asp
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
https://developer.forecast.io/docs/v2
https://darkskyapp.github.io/skycons/
http://stackoverflow.com/questions/20270235/skycons-break-when-calling-forecast-io-api-with-time-interval
https://developers.google.com/maps/documentation/geocoding/intro

