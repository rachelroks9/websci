Rachel Blacker
Web Science Systems Development
Spring 2016
Lab 7: Node.JS, MongoDB and Tweets

I decided to redo my entire lab because initially I did it with sockets. I found this to be quite challenging to work with as I moved forward, so it made more sense for me to redo things now. That being said, I understand my code much better now and find it much easier to create functions and perform certain activities. The majority of my time on this lab was spent recoding my node.js and app.js to be used without sockets.

A few big changes that resulted from me changing my code:
- I got rid of the hashtags section. This proved to be too challenging to recode and I did not find it a necessary component of my website
- I organized all of my files into sub folders (CSS, JS, img, etc.)
- I organized all of my export files into a folder, broken up by what type of file

I found this lab to not be too challenging because of one of my resources that walked me through using the mongodb module in Node.JS. One mistake I had that caused some headache was I initially inserted the tweets into the database, but if there was multiple queries, all of the information would be in the database, not just the last query information. For that reason I clear out my database every time I build the database. 

I used the same look and styling for this lab as I did for lab 1, lab 4, lab 5, and lab 6. Some of the features for my website are an instruction div that disappears when a search is made and a spinning wheel that appears after a search is made but before tweets have been received. If you choose to export the tweet information, the website checks if the file you are trying to export has already been created. If it has, it alerts you the document is being updated, otherwise it says that it is creating a document.

I decided to change a bit of functionality for my website. When the user presses “Load” the tweets will load, but will not be displayed. Then the user can either export the tweets to a JSON or CSV file or can build a mongo database with the tweets information. Once a mongo database has been created, the user can then read from the database and display the tweets or can export the tweets to an XML file. 


Resources:

http://blog.modulus.io/mongodb-tutorial

https://www.npmjs.com/package/jstoxml