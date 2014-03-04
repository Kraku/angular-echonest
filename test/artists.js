'use strict';
 
describe('Artists', function() {
  var echonest, httpBackend;

  var apiUrl = 'http://developer.echonest.com/api/v4/';
  var artistsApiResponse = {
    response: {
      artists: [
        {
          id: 'AR212SC1187FB4A4F9',
          name: 'nirvana'
        },
        {
          id: 'ARTSYYD1369F266E57',
          name: 'acdc'
        },
        {
          id: 'AR6ZH2F1187FB4FB84',
          name: 'motorhead'
        }
      ],
      status: {
        code: 0,
        message: 'Success',
        version: '4.2'
      }
    }
  };

  var artistApiResponse = {
    response: {
      artist: {
        id: 'AR212SC1187FB4A4F9',
        name: 'motorhead'
      },
      status: {
        code: 0,
        message: 'Success',
        version: '4.2'
      }
    }
  };

  beforeEach(angular.mock.module('angular-echonest'));

  beforeEach(inject(function($injector) {
    echonest = $injector.get('Echonest');
    httpBackend = $injector.get("$httpBackend");

    httpBackend.when('JSONP', apiUrl + 'artist/profile?api_key=&callback=JSON_CALLBACK&format=jsonp&name=motorhead').respond(artistApiResponse);

    httpBackend.when('JSONP', apiUrl + 'artist/search?api_key=&callback=JSON_CALLBACK&format=jsonp&name=motorhead').respond(artistsApiResponse);
    httpBackend.when('JSONP', apiUrl + 'artist/top_hottt?api_key=&callback=JSON_CALLBACK&format=jsonp&results=3').respond(artistsApiResponse);
    httpBackend.when('JSONP', apiUrl + 'artist/suggest?api_key=&callback=JSON_CALLBACK&format=jsonp&name=motorhead').respond(artistsApiResponse);
    httpBackend.when('JSONP', apiUrl + 'artist/extract?api_key=&callback=JSON_CALLBACK&format=jsonp&text=abc+motorhead+abc').respond(artistsApiResponse);
  }));
    
  it('get method should return artist object', function(){
    echonest.artists.get({
      name: 'motorhead'
    }, function(artist, status) {
      expect(artist.constructor.name).toBe('Object');
      expect(artist.id).toBe('AR212SC1187FB4A4F9');
      expect(artist.name).toBe('motorhead');
    });

    httpBackend.flush();
  });

  it('search method should return array of artist objects', function(){
    echonest.artists.search({
      name: 'motorhead'
    }, function(artists, status) {
      expect(artists.constructor.name).toBe('Array');
      expect(artists[0].constructor.name).toBe('Object');
      expect(artists[0].id).toBe('AR212SC1187FB4A4F9');
      expect(artists[0].name).toBe('nirvana');
    });

    httpBackend.flush();
  });

  it('topHot method should return array of artist objects', function(){
    echonest.artists.topHot({
      results: 3
    }, function(artists, status) {
      expect(artists.constructor.name).toBe('Array');
      expect(artists[0].constructor.name).toBe('Object');
      expect(artists[0].id).toBe('AR212SC1187FB4A4F9');
      expect(artists[0].name).toBe('nirvana');
    });

    httpBackend.flush();
  });

  it('suggest method should return array of artist objects', function(){
    echonest.artists.suggest({
      name: 'motorhead'
    }, function(artists, status) {
      expect(artists.constructor.name).toBe('Array');
      expect(artists[0].constructor.name).toBe('Object');
      expect(artists[0].id).toBe('AR212SC1187FB4A4F9');
      expect(artists[0].name).toBe('nirvana');
    });

    httpBackend.flush();
  });

  it('extract method should return array of artist objects', function(){
    echonest.artists.extract({
      text: 'abc motorhead abc'
    }, function(artists, status) {
      expect(artists.constructor.name).toBe('Array');
      expect(artists[0].constructor.name).toBe('Object');
      expect(artists[0].id).toBe('AR212SC1187FB4A4F9');
      expect(artists[0].name).toBe('nirvana');
    });

    httpBackend.flush();
  });
});
