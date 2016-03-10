Rachel Blacker
Web Science Systems Development
Spring 2016
Lab 5: Node.JS, AngularJS and Twitter API

I found this lab to be incredibly challenging. After many failed attempts or partial attempts, I decided to use socket.io for the lab. The websites below helped me immensely in figuring out the lab. 

Some of the features for my website are an instruction div that disappears when a search is made, a spinning wheel that appears after a search is made but before tweets have been received, and a list of hashtags associated with the tweets that were queried. 

I used the same look and styling for this lab as I did for lab 1 and lab 4. Additionally, I switched up my angular code from lab 4 to work better with node.js. I found taking client side information (like query and count number) and sending it to server side to be a challenge, but once I used the resources below it became easier.

The only other struggle I had with this lab was the default search for locations around RPI. My syntax was off which caused a lot of problems. In the end I found making a variable parameters to be the best way to tackle the issue.

What was nice about using socket.io is that as a tweet comes in, it is displayed on my website. This allows the application to be real time as well as the user does not have to wait that long if no one is tweeting about their query.


Resources:
http://thejackalofjavascript.com/twitter-live-search/

http://www.kdelemme.com/2014/04/24/use-socket-io-to-stream-tweets-between-nodejs-and-angularjs/

https://www.npmjs.com/package/twit

https://github.com/nishantmendiratta/Node-JS/wiki/Combining-realtime-twitter-data-with-socket.io-and-streaming-data-at-browser
