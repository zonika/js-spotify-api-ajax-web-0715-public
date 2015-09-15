var url = "http://charts.spotify.com/api/tracks/most_streamed/us/weekly/latest";

var dataSetProperties = {
  label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count',
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
}

$(function() {
  getSpotifyTracks(success);
});

function extractTop20Tracks(tracks) {
  return tracks.slice(0,20);
}
// look up .map in js
function extractNumberOfStreams(tracks) {
  var ret = []
  tracks.forEach(function(track){
    ret.push(track['num_streams']);
  })
  return ret;
}

function extractNames(tracks) {
  var ret = []
  tracks.forEach(function(track){
    ret.push(track['track_name']);
  })
  return ret;
}

function chartData(labels, inputData) {
  var ds = {
    label: dataSetProperties.label,
    fillColor: dataSetProperties.fillColor,
    strokeColor: dataSetProperties.strokeColor,
    highlightFill: dataSetProperties.highlightFill,
    highlightStroke: dataSetProperties.highlightStroke,
    data: inputData
  };
  var ret = {
    labels: labels,
    datasets: [ds]
  };
  return ret;
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: callback
  });
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractNumberOfStreams - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
  var tracks = extractTop20Tracks(parsedJSON.tracks);
  var names = extractNames(tracks);
  var nums = extractNumberOfStreams(tracks);
  var data = chartData(names, nums);
  var ctx = document.getElementById('spotify-chart').getContext('2d');
  var myBarChart = new Chart(ctx).Bar(data);
}
