var key = require('./keys.js');
var Twitter = require('twitter');
var twitKeys = new Twitter(key.twitterKeys)
var command= process.argv[2];
var commandTwo = process.argv.slice(3).join(' ');
var spotify = require('spotify');
var omdb = require('request')
var param = {screen_name: 'JOonhisJOB'};
var fs = require('fs')


function tweets(){
  twitKeys.get('statuses/user_timeline', param, function(error, tweets, response){
    if (!error) {

      for (var i =0; i<tweets.length; i++){
        console.log(tweets[i].text);
      }

    }

  });
}
function movie(){

 omdb('http://www.omdbapi.com/?t='+ commandTwo +'&y=&plot=short&r=json', function (error, response, body) {
   if (!error && response.statusCode == 200) {
     var json = JSON.parse(body);
   console.log("Title: " + json.Title);
   console.log("Year: " + json.Year);
   console.log("IMBD Rating: " + json.imdbRating);
   console.log("Country: " + json.Country);
   console.log("Plot: " + json.Plot);
   console.log("Actors: " + json.Actors);
   console.log("Metacore: " + json.Metascore);
	 }
  
 });
}
function  spotifymusic(){
  fs.appendFile('random.txt' , " , " + commandTwo );
  spotify.search({ type: 'track', query: commandTwo }, function(err, data){
   console.log(data.tracks.items[0].artists[0]);
   console.log(data.tracks.items[0].name);
   console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].preview_url);

 });
}

switch(command){
 case 'my-tweets':
  tweets();
  break;
  case 'movie-this':
  movie();
  break;
  case 'spotify-this-song':
  spotifymusic();
  break;
  default:
  	console.log('Not a command');
  break;

}