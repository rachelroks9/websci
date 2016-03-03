<?php
require_once('TwitterAPIExchange.php');

$settings = array(
    'oauth_access_token' => '151226369-BwfajRc6ajKp7fqHrnvohDCRZoe4ClDDfMs2n4wM',
    'oauth_access_token_secret' => '2QvNYhSN2eGq3j2T8FG1QP18QHNwwq4lXfWGOYcJpGBpt',
    'consumer_key' => 'NlfIcAOtwQcR6F8XQQ5o2aecN',
    'consumer_secret' => '0QRqiFAaJeSNYPtIk2wmY8IdNVkbcmTvm54leG1nHbnieFCPYv'
);

$url = "https://api.twitter.com/1.1/search/tweets.json";
$requestMethod = "GET";

$query = '?q=';
if(isset($_GET['q']) && $_GET['q']!='' ) {

    $query .= $_GET['q'];

} else {
    $query .= 'something';
}

//echo $query;
$twitter = new TwitterAPIExchange($settings);
$results = $twitter->setGetfield($query)->buildOauth($url, $requestMethod)->performRequest();
echo $results;
?>
