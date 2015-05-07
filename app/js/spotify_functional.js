// https://developer.spotify.com/web-api/search-item/
function searchByAlbum(keyword) {
  var url = "https://api.spotify.com/v1/search?q="+keyword + "&type=album";

  $.getJSON(url).then(function(data) {
    var html = '';
    for (var i=0; i < data.albums.items.length; i++) {
      var album = data.albums.items[i];
      html += '<li>'+ album.name +'</li>';
    }
    $('#results').html(html);
  });
}

function searchByArtist(keyword) {
  var url = "https://api.spotify.com/v1/search?q="+keyword + "&type=artist";

  $.getJSON(url).then(function(data) {
    var html = '';
    for (var i=0; i < data.artists.items.length; i++) {
      var artist = data.artists.items[i];
      html += '<li>'+ artist.name +'</li>';
    }
    $('#results').html(html);
  });
}

function searchByTrack(keyword) {
  var url = "https://api.spotify.com/v1/search?q="+keyword + "&type=track";
  //var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;

  $.getJSON(url).then(function(data) {
    var html = '';

    for (var i=0; i < data.tracks.items.length; i++) {
      var track = data.tracks.items[i];
      html += '<li>'+ track.name +'</li>';
    }
    $('#results').html(html);
  });
}

function newSearch(keyword) {
  var searchType = $('#search-type').val();

  if (searchType === 'artist') {
    searchByArtist(keyword);
  } else if (searchType == 'album'){
    searchByAlbum(keyword);
  } else {
    searchByTrack(keyword);
  }
}

$('#search').on('submit', function(evt) {
  evt.preventDefault();
  keyword = escape($('#search-keyword').val());
  newSearch(keyword);
});

$('#search-type').on('change', newSearch);
