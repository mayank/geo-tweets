var twitterAPI = require('node-twitter-api');
var chalk = require('chalk');
var config = require('./twitter.config')

var twitter = twitterAPI(config.keys);

exports.getTweetsByLocation = function(geo, callback, query){
	var status = [];
	twitter.search({ 
		q: query || '',
		geocode: geo.lat+','+geo.lng+',1mi',
		type: 'recent',
		lang: 'en',
		count: 100
	},
	null,
	null,
	function(error, data){
		if(error){ console.log(error); return; }
		
		for(var i=0;i<data.statuses.length;i++){
			status.push(data.statuses[i]);
		}
		callback(status)
	});
}
