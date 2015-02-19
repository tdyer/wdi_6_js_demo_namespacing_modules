'use strict';

var Spotify = (function () {
    var url = 'https://api.spotify.com/';
    var version = 'v1';

    var Song = function (title, artist, album) {
        var display = function () {
          // Your code goes here
        };

        var search = function () {
            return url + version + '/search?q=' + _urlEscape(title) + '&type=track';
        };

        var _urlEscape = function (string) {
          // Write code that translates all spaces in `string` into URL-safe spaces
        };

        return {
            title: title,
            artist: artist,
            album: album,
            display: display,
            search: search
        };
    };

    return {
        Song: Song
    };
})();
