Rachel Blacker
Web Science Systems Development
Spring 2016
Lab 9: Putting it All Together

Throughout the course of my Web Science labs I have just added on features, never removed any features or buttons. For this reason I found this lab to be pretty easy. Back in lab 7 I redid all of my server and angular code to simplicity, which also made this lab pretty easy. 

The first thing for this lab was make a landing page. Similar to the rest of my application, it has a very clean look and simple design. For my landing page I added an animation to the header and CSS transitions for the button. This added just a little pizzaz, while not overwhelming the user. Once the user clicks on the “Get Started” button the landing page is hidden and the application is shown.

I decided to make my application easy for the user and broke up all buttons/input fields into 4 steps. The first step loads the tweets. I give the user two options: keep the box empty to get tweets around RPI or enter in a query. When the user presses load the loading icon is shown. Until the loading icon disappears, all of the tweets have not been received. The second step allows you to build a database of all of the tweets you have just collected. A success message (with a new look thanks to a node.js module) appears letting the user know that a database has been created. Step three allows the user to read from the database and therefore display the tweets. A page with the tweets you searched for is then displayed. At this time step four is also displayed. This step is optional and allows the user to export the tweets into either JSON, CSV, or XML. If the user selects XML as the file type, the File Name box is enabled. The user can either enter in a file name, or if left empty a default file name will be given. A success message appears after each export of the file. In order to implement the steps and what can be seen at what time, I used scope variables in my angular code and then ng-show in my index. 

Before this lab the user had to restart the server in order to do multiple searches. I fixed this issue by reseting the array where I keep the tweets. Now a user can just refresh the page and they can do another search. 

A big change I added to my site was the look of alerts. I thought the plain alert message was not very flattering so I looked into other alert messages. SweetAlert, a node module, allows you to have a few different types of alert messages. I decided to just stick with their alert for success messages for simplicity. Using SweetAlert was very easy and was just a simple line of code to use. 

In order to obtain more tweets, the user must refresh the page. When refreshing the page, the entire application is restarted.

Resources:

http://t4t5.github.io/sweetalert/

http://lipis.github.io/bootstrap-sweetalert/

http://stackoverflow.com/questions/18153234/center-a-column-using-twitter-bootstrap-3

http://www.w3schools.com/bootstrap/bootstrap_forms.asp

http://stackoverflow.com/questions/22056293/bootstrap-inline-form-is-not-responsive-on-low-width

https://getbootstrap.com/examples/grid/

http://stackoverflow.com/questions/23977211/how-to-show-a-form-field-only-if-another-is-selected-in-angularjs

https://daneden.github.io/animate.css/