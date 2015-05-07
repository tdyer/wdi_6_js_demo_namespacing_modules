'use strict';

// Use an IIFE to create another scope
// that is hidden from the Global namespace.

// Thanks to Jeff Horn for this example

// Create a namespace for Spotify
var Spotify = (function () {

  // Create variables and functions that are private
  // to this namespace. Can't be accessed outside
  // this IFFE

  // private variable
  var _currentSongID = 0;

  // private function
  var _generateSongID = function(){
    return _currentSongID += 1;
  };

  // Create a Constructor Function for Song
  var Song = function (title, artist, album, price) {
    // Behind the scenes javascript will do this
    this.title = title;
    this. artist = artist;
    this.album = album;

    // call the private function to generate an id.
    // find this function in the outer scope.
    this.id = _generateSongID();

    // This will create display function every time
    // you 'new Spotify.Song(...)'
    // NOT GOOD!! DON'T DO THIS.
    // this.display = function(){
    //   return this.title + " by " + this.artist + " on " + this.album;
    // };
  };

  Song.prototype.display = function(){
    return this.id + ": " + this.title + " by " + this.artist + " on " + this.album;
  };

  Song.prototype.numberOfSongs = function(){
    // access private variable
    return _currentSongID;
  };

  return {
    Song: Song
  };
})();

var song1 = new Spotify.Song("s1", "a1", "album1");
var song2 = new Spotify.Song("s2", "a2", "album2");
console.log(song1.display());
console.log(song2.display());

// Can't access private variables/functions
// console.log('Spotify._currentSongID is ' + Spotify._currentSongID);
// Spotify._currentSongID is undefined

// console.log('Spotify._generateSongID is ' + Spotify._generateSongID());
// TypeError: undefined is not a function



// check for side effects
song1.title = "song1";
console.log(song1.display());
console.log(song2.display());
