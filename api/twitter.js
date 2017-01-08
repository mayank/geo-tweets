var twitterAPI = require('node-twitter-api');
var chalk = require('chalk');
var config = require('./twitter.config')

var twitter = twitterAPI(config.keys);

exports.getTweetsByLocation = function(params, callback){
	var status = [];

	twitter.search({ 
		q: params.query || '',
		geocode: params.lat+','+params.lng+',1mi',
		type: 'recent',
		lang: 'en',
		count: 100
	}, null, null, // accessToken & requestToken not required
	function(error, data){
		if(error){ console.log(error); return; }
		callback(data.statuses);
	});
};
