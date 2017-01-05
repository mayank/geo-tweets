var twitterAPI = require('node-twitter-api');
var chalk = require('chalk');

var accessToken = '144868886-nwrXYkITtVTiR0ah9B2NLzIkOrarrqYzie9uthot';
var secretToken = 'lbtW6zYJynWFSKpwWTTerGQAaGCYUdQF5EwNCGuZwfa2O';

var twitter = twitterAPI({
	consumerKey: 'uxtaIhUcBmhNB093uQ9IeN6lP',
	consumerSecret: '2YBBVIT9bCGdb87ho0HPtku8uNA1GFvesgCNIlsURl1xIiUZ5Y',
	callback: 'http://localhost:8080'
});


twitter.search({ 
		q: '',
		geocode: '28.535516,77.391026,5km',
		type: 'recent',
		lang: 'en',
		count: 100
	}, 
	accessToken, 
	secretToken,
	function(error, data){
		for(var i=0;i<data.statuses.length;i++){
			var status = data.statuses[i];
			console.log(chalk.green(status.user.name)+'['+chalk.red('@'+status.user.screen_name)+'] '+status.text);			
		}
	}
);
