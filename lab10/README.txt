Rachel Blacker
Web Science Systems Development
Spring 2016
Lab 10: Twitter Visualizations

Lab 10 proved to be extremely difficult for me in the begging. I changed my code a while back to not be run with sockets, so when I was told I had to provide continuous data I had to think of a way to do that. The first thing I did was get charts working with just dummy data. That in itself took a bit because documentation for charts.js isn’t the best (in my opinion). The next thing I did was actually collect the data on the server side. Once I made sure that the data was continuous on the back end, I had to send it to the front end. I used the sample of this lab and did an app.get were I returned an array or object of my data. Then on the front end I set the div with the chart to refresh at a certain time. My bar chart refreshes every 2 seconds, my pie chart refreshes ever 4 seconds and my map refreshes every 10 seconds.

My first chart I decided to analyze the amount of tweets about the three political candidates still in the running for president: Donald Trump, Hillary Clinton and Bernie Sanders. Consistently you can see that most people are tweeting about Trump, then Hillary and then Bernie. When looking at about 20,000 tweets the breakdown is 68% tweets about Trump, 21.5% tweets about Hillary and 10.5% tweets about Bernie.

My second chart looks at all of the tweets that have to do with Donald Trump, Hillary Clinton and Bernie Sanders and analyzes on which platform people were using to tweet. There are hundreds of platforms the user can use to tweet, but I focused on the big three: Twitter Web Client, Twitter for iPhone and Twitter for Android. I then made an other field to show all of the other platforms people were using. When looking at about 25,000 tweets the breakdown is 21% tweets from Twitter Web Client, 40% tweets from Twitter for iPhone, 17% tweets from Twitter for Android and 22% tweets from other platforms.

My third chart is not through chart.js but through Google Visualizations. This chart was by far the hardest. Getting the chart to run with just dummy data was hard. The map only displays markers for tweets from the US. One of the issues was that tweets about these candidates also happen overseas; those tweets are not displayed on the map. The map displays tweets based on their geo location. When look at about 30,000 tweets the majority of the tweets were coming from the east coast and mid west. The west coast also has a decent amount of tweets. The west has very little people tweeting about the political candidates. 

Overall, this was definitely one of the harder labs. While it took a lot more time than other labs, I found the visualizations to be pretty cool. I found the breakdown really interesting in regards to the number tweets about each candidate and where the majority of the tweets were coming from. 


Resources:

https://developers.google.com/chart/interactive/docs/customizing_tooltip_content#customizing-tooltip-content

http://www.chartjs.org/docs/

https://developers.google.com/chart/interactive/docs/gallery/geochart#markers-mode-format

https://developers.google.com/chart/interactive/docs/gallery/geochart#coloring-your-chart

https://developers.google.com/chart/interactive/docs/gallery/geochart#marker-geocharts

http://stackoverflow.com/questions/12415689/how-to-dynamically-add-rows-columns-to-a-google-column-chart

http://stackoverflow.com/questions/10557886/how-to-specify-a-custom-css-font-font-family-within-the-google-visualization-a

http://stackoverflow.com/questions/13647889/google-geochart-border-colour

https://developers.google.com/chart/interactive/docs/datatables_dataviews#emptytable

http://www.webdesignerdepot.com/2013/11/easily-create-stunning-animated-charts-with-chart-js/