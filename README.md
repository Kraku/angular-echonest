Angular-echonest
=============

Angular-echonest allows you to easily call Echo Nest methods in AngularJS.

Uses EchoNest API v4.

# Status
This module is still under heavy development.

# Installation
------------
```js
myApp.config(['EchonestProvider', function(EchonestProvider) {
  EchonestProvider.setApiKey('apiKey');
}]);
```

Get [an API key](http://developer.echonest.com/docs/v4/#keys).

# Usage
------------
```js
myApp.controller('SomeCtrl', function($scope, Echonest) {
  ...
});
```
------------

## Artists Methods
  * artists.search
  * artists.get

## Artist Methods
  * getBiographies
  * getBlogs
  * getImages
  * getNews
  * getReviews
  * getSongs
  * getFamiliarity
  * getHotttnesss
  * getSimilar
  * getTerms
  * getTwitter
  * getUrls

(Api Doc)[http://developer.echonest.com/docs/v4/artist.html]

# Example
------------
#### Get artist songs
```js
// Multiple requests
Echonest.artists.get({
  name: 'nirvana'
}, function(artist) {
  artist.getSongs(); // -> id: "ARH3S5S1187FB4F76B", name: "Nirvana", songs: Array[15]
});
```
or
```js
// Single request
Echonest.artists.get({
  name: 'nirvana',
  bucket: 'songs'
}, function(artist, status) {
  artist; // -> id: "ARH3S5S1187FB4F76B", name: "Nirvana", songs: Array[15]
});
```

#### Search artist
```js
// Search for artists from the Boston area
Echonest.artists.search({ 
  artist_location: 'boston',
  results: 3
}, function(artists, status) {
  artists; // -> [{id: "AR12F2S1187FB56EEF", name: "Aerosmith"}, {...}, {...}]
});


### TO DO
  * Song methods
  * Track methods
  * Playlist methods
  * Song methods


---
© 2014 [Maciej Podsiedlak](mpodsiedlak.com) - Released under MIT License