
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

    var get = function(name, data) {
      var t = this;
      data = data || {};

      data.id = t.id;

      query('artist/' + name, data, function(result) {
        t[name] = result[name];
      });

      return t;
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
      getBiographies: function(data) {
        get.call(this, 'biographies', data);

        return this;
      },
      getBlogs: function(data) {
        get.call(this, 'blogs', data);

        return this;
      },
      getImages: function(data) {
        get.call(this, 'images', data);

        return this;
      },
      getNews: function(data) {
        get.call(this, 'news', data);

        return this;
      },
      getReviews: function(data) {
        get.call(this, 'reviews', data);

        return this;
      },
      getSongs: function(data) {
        get.call(this, 'songs', data);

        return this;
      },
      getFamiliarity: function(data) {
        get.call(this, 'familiarity', data);

        return this;
      },
      getHotttnesss: function(data) {
        get.call(this, 'hotttnesss', data);

        return this;
      },
      getSimilar: function(data) {
        get.call(this, 'similar', data);

        return this;
      },
      getTerms: function(data) {
        get.call(this, 'terms', data);

        return this;
      },
      getTwitter: function(data) {
        get.call(this, 'twitter', data);

        return this;
      },
      getUrls: function(data) {
        get.call(this, 'urls', data);

        return this;
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
