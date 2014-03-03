Angular-echonest
=============

Angular-echonest allows you to easily call Echo Nest methods in AngularJS.

Uses EchoNest API v4.

## Status
This module is still under heavy development.

## Installation
```js
var myApp = angular.module('myApp', [
  'angular-echonest'
]);

myApp.config(['EchonestProvider', function(EchonestProvider) {
  EchonestProvider.setApiKey('apiKey');
}]);
```

Get [an API key](http://developer.echonest.com/docs/v4/#keys).

## Usage
```js
myApp.controller('SomeCtrl', function($scope, Echonest) {
  ...
});
```

### Artists Methods
  * *search* - Search artists.
  * *get* - Get artists by id or name.
  * *topHot* - Return a list of the top hottt artists.
  * *suggest* - Suggest artists based upon partial names. This method will return a list of potential artist matches based upon a query string. The method returns the most familiar best matching artist for the query.
  * *extract* - Extract artist names from text.

### Artist Methods
  * *getBiographies* - Get a list of artist biographies.
  * *getBlogs* - Get a list of blog articles related to an artist.
  * *getImages* - Get a list of artist images.
  * *getNews* - Get a list of news articles found on the web related to an artist.
  * *getReviews* - Get reviews related to an artist's work.
  * *getSongs* - Get a list of songs created by an artist.
  * *getFamiliarity* - Get our numerical estimation of how familiar an artist currently is to the world.
  * *getHotnes* - Returns our numerical description of how hottt an artist currently is.
  * *getSimilar* - Return similar artists given one or more artists for comparison. The Echo Nest provides up-to-the-minute artist similarity and recommendations from their real-time musical and cultural analysis of what people are saying across the Internet and what the music sounds like.
  * *getTerms* - Get a list of most descriptive terms for an artist.
  * *getTwitter* - Gets the twitter handle for an artist.
  * *getUrls* - Get links to the artist's official site, MusicBrainz site, MySpace site, Wikipedia article, and official URL.

[Api Doc](http://developer.echonest.com/docs/v4/artist.html)

## Example
#### Get artist songs
```js
// Multiple requests
Echonest.artists.get({
  name: 'nirvana'
}, function(artist, status) {
  artist.getSongs(); // -> {id: "ARH3S5S1187FB4F76B", name: "Nirvana", songs: Array[15]}
});

// or

// Single request
Echonest.artists.get({
  name: 'nirvana',
  bucket: 'songs'
}, function(artist, status) {
  artist; // -> {id: "ARH3S5S1187FB4F76B", name: "Nirvana", songs: Array[15]}
});
```

#### Search for artists from the Boston area
```js
Echonest.artists.search({ 
  artist_location: 'boston',
  results: 3
}, function(artists, status) {
  artists; // -> [{id: "AR12F2S1187FB56EEF", name: "Aerosmith"}, {...}, {...}]
});
```

#### Get artist by name
```js
Echonest.artists.get({ 
  name: 'motorhead'
}, function(artist, status) {
  artist; // -> {id: "AR212SC1187FB4A4F9", name: "Motörhead"}
});
```

#### Get top 10 rock artists
```js
Echonest.artists.topHot({
  genre: 'rock',
  results: 10
}, function(artists, status) {
  artists; // -> [{id: "ARUJ5A41187FB3F5F1", name: "U2"}, {...}, {...}, ...]
});
```

## TO 
  * Unit tests
  * Song support
  * Track support
  * Playlist support

<br>
---
© 2014 [Maciej Podsiedlak](http://mpodsiedlak.com) - Released under MIT [License](https://github.com/Kraku/angular-echonest/blob/master/LICENSE)
