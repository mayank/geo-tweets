var twitterAPI = require('node-twitter-api');
var chalk = require('chalk');
var config = require('./twitter.config')

const debug = false;

var twitter = twitterAPI(config.keys);

exports.getTweetsByLocation = function(geo, callback){
	var status = [];
	twitter.search({ 
		q: '',
		geocode: geo.lat+','+geo.lng+',1mi',
		type: 'recent',
		lang: 'en',
		count: 100
	},
	config.tokens.accessToken, 
	config.tokens.secretToken,
	function(error, data){
		if(error){ console.log(error); return; }
		
		for(var i=0;i<data.statuses.length;i++){
			status.push(data.statuses[i]);
			if(debug) onsole.log(chalk.green(status.user.name)+'['+chalk.red('@'+status.user.screen_name)+'] '+status.text);			
		}
		callback(status)
	});
}
