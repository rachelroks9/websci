Rachel Blacker
Web Science Systems Development
Spring 2016
Lab 8: Node.JS, SPARQL and RDF

Initially, I found the lab to be pretty easy. Once I had a query that worked, it wasn’t hard to connect to the SPARQL module. Finding the header versus the data in the result was a lot of guess and check, but did not take long. The main challenge I had with this lab was displaying results. 

One challenge I found with this lab was how to show the headers without hardcoding my default query. Once I added everything into an array (called buffer) I was able to retrieve the headers. This then provided another challenge about how to get the data then without hardcoding. After a LOT of online research I found that using a nested ng-repeat was the best way to get all of the data without hardcoding it to the default query (this way if anyone changed the query to their own the proper information would be displayed). 

It was interesting coming up with my own query. Once I got the syntax down, it was fun playing around trying to create a “meaningful” query. One thing that would have helped with this lab is if there is more documentation about SPARQL online, but there is nothing the instructors can do about that. 


Resources:

http://stackoverflow.com/questions/1154546/sorting-sparql-results-by-date

http://stackoverflow.com/questions/18428851/querying-for-norwegian-born-people-results-in-undefined-namespace-prefix

https://www.npmjs.com/package/sparql

http://expressjs.com/en/guide/error-handling.html

https://www.codementor.io/debugging/4948713248/request-want-to-use-values-in-nested-ng-repeat

http://dbpedia.org/ontology/

https://docs.apitools.com/docs/test-debug/
