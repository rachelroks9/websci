Rachel Blacker
Web Science Systems Development
Spring 2016
Lab 6: Node.JS and Tweets.JSON to CSV

I found this lab to be pretty easy to code conversion for creating the CSV file, but slightly challenging breaking up loading and exporting button. I didn’t realize that how i wrote my export function, it would have to be called for each tweet. Before I realized this it caused a few bugs.

Some of the features for my website are an instruction div that disappears when a search is made, a spinning wheel that appears after a search is made but before tweets have been received, and a list of hashtags associated with the tweets that were queried. Furthermore, the website checks if the file you are trying to export has already been created. If it has, it alerts you the document is being updated, otherwise it says that it is creating a document.

I used the same look and styling for this lab as I did for lab 1, lab 4 and lab5. Additionally, I switched up my angular code to create more functions from lab 5 to work better with multiple buttons in the HTML.

It was pretty cool to learn how easy it is to create files with node.js. A few lines of code and you can do some very powerful operations on the file system. I thought this lab really showed how powerful Node.js can be.


Where would it be better to place the CSV conversion code, in the node server or in an Angular controller? Why?

It would be better to place the CSV conversion code in the node server rather than the Angular controller. Node.js is backend and supports file handling; Angular is front end and client side, which does not have file editing ability. All of the tweet information is obtained in Node and then can be written to the file. After that the tweet information can be sent to angular and the front end to display. It would be impractical to do the CSV conversion code in angular since you would have to pass all of the tweet information to angular, convert it and then send it back to node.js to write to the file.


Resources:

https://www.npmjs.com/package/json2csv

http://thejackalofjavascript.com/twitter-live-search/

http://www.kdelemme.com/2014/04/24/use-socket-io-to-stream-tweets-between-nodejs-and-angularjs/

https://www.npmjs.com/package/twit

https://github.com/nishantmendiratta/Node-JS/wiki/Combining-realtime-twitter-data-with-socket.io-and-streaming-data-at-browser
