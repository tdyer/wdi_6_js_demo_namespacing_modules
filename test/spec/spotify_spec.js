'use strict';

describe('Spotify Song', function () {
  var shake = Spotify.Song('Shake It Off', 'Taylor Swift', '1989');

  describe('.display', function () {
    it('returns a human readable representation of the song data', function () {
      expect(shake.display()).toEqual('Shake It Off by Taylor Swift on 1989');
    });
  });

  describe('.search', function () {
    it('returns a Spotify API URL that searches for the track', function () {
      expect(shake.search()).toEqual('https://api.spotify.com/v1/search?q=Shake%20It%20Off&type=track');
    });
  });
});
