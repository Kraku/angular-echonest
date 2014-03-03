
/**
 * angular-echonest module
 * https://github.com/kraku/angular-echonest
 *
 * Author: Maciej Podsiedlak - http://mpodsiedlak.com
 */

(function() {
  'use strict';

  angular.module('angular-echonest', []).provider('Echonest', function() {
    var apiUrl = 'http://developer.echonest.com/api/v4/';
    var apiKey = '';
    var Artist, Artists, obj, http;

    var query = function(url, data, callback) {
      data.api_key = apiKey;
      data.format = 'jsonp';
      data.callback = 'JSON_CALLBACK';

      http({
        method: 'JSONP',
        url: apiUrl + url,
        params: data
      }).success(function(result) {
        callback(result.response);
      }).error(function() {});
    };

    this.setApiKey = function(value) {
      apiKey = value;
    };


    // Artist class
    Artist = function(props) {
      if (props instanceof Object) {
        for (var i in props) {
          if (props.hasOwnProperty(i)) {
            this[i] = props[i];
          }
        }
      }

      return this;
    };

    Artist.prototype = {
      getBiographies: function() {
        this.get('biographies', data);

        return this;
      },
      getBlogs: function() {
        this.get('blogs', data);

        return this;
      },
      getImages: function() {
        this.get('images', data);

        return this;
      },
      getNews: function() {
        this.get('news', data);

        return this;
      },
      getReviews: function(data) {
        this.get('reviews', data);

        return this;
      },
      getSongs: function(data) {
        this.get('songs', data);

        return this;
      },
      get: function(name, data) {
        var t = this;
        data = data || {};

        data.id = t.id;

        query('artist/' + name, data, function(result) {
          t[name] = result[name];
        });

        return t;
      }
    };


    // Artists class
    Artists = function() {
      return this;
    };

    Artists.prototype = {

      /*
       * Search artists
       *
       * doc: http://developer.echonest.com/docs/v4/artist.html#search
       */
      search: function(params, callback) {
        var data = [];

        if (params instanceof Object) {
          for (var i in params) {
            if (params.hasOwnProperty(i)) {
              data[i] = params[i];
            }
          }
        }

        query('artist/search', data, function(result) {
          var artists = [];

          for (var i in result.artists) {
            artists.push(new Artist(result.artists[i]));
          }

          callback(artists, result.status);
        });
      },

      /*
       * Get artist
       */
      get: function(data, callback) {
        if (data instanceof Object) {
          query('artist/profile', data, function(result) {
            callback(new Artist(result.artist), result.status);
          });
        }
      }
    };


    this.$get = function($http) {
      http = $http;

      obj = {
        artists: new Artists()
      };

      return obj;
    };
  });
})();
