var express = require('express')
var io = require('socket.io')
var twitter = require('./api/twitter')

var app = express()
var markerTimeout = 2*60*1000	// tweets polling time

app.use(express.static('public/'))
app.set('views', './views')
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render('app')
})

var server = app.listen(process.env.PORT || 5000)
var socket = io.listen(server)


var getTweets = function(data){

	twitter.getTweetsByLocation(data, function(tweets){
	
		tweets.forEach(function(elem){

			if(elem.geo != null){

				let latitude = elem.geo.coordinates[0];
				let longitude = elem.geo.coordinates[1];

				socket.emit('mark', {
					tweet: elem.text,
					coords: {lat: latitude, lng: longitude},
					dp: elem.user.profile_image_url_https
				});

			}
		})

		setTimeout(function(){ getTweets(data) }, markerTimeout);
	});
}

// send data each time user connects
socket.on('connection', function(user){
	user.on('register', function(data){
		getTweets(data);
	})
})
