// (C) 2015 Gal Dubitski
//
// Twitter Marketing Tool API
//

exports.login = function(params,callback) {
	console.log('inside login',params);
	var twitterAPI = require('node-twitter-api');
	twitter = new twitterAPI({
	    consumerKey: params.key,
	    consumerSecret: params.secret,
	    callback: 'http://localhost:8080/twcallback'
	});
	
	twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
	    if (error) {
	        console.log("Error getting OAuth request token", error);
	        callback(false);
	    } else {
	        //store token and tokenSecret somewhere, you'll need them later; redirect user
	        console.log("requestToken", requestToken);
	        console.log("requestTokenSecret", requestTokenSecret);
	        console.log("results", results);
	        callback(true, requestToken, requestTokenSecret);
	    }
	});

};

exports.getAccessToken = function(params,callback) {
	twitter.getAccessToken(params.token,params.tokenSecret,params.oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
	    if (error) {
	        console.log(error);
	        callback(false);
	    } else {
	        callback(true,accessToken,accessTokenSecret);
	    }
	});
};

exports.startMarketing = function(params,callback) {
	twitter.followers("list", {
	    screen_name: params.account
	  },
	  params.accessToken,
	  params.accessTokenSecret,
	  function(error, data, response) {
	      if (error) {
	          // something went wrong
	          callback(false);
	      } else {
	          // data contains the data sent by twitter
	          console.log('got data',data);
	          callback(true);
	      }
	  }
	);
};










