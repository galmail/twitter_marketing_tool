/* mainCtrl.js */

var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope,$http,$location){

	$scope.twitter_credentials = {
		key: '',
		secret: ''
	};

	$scope.twitter_marketing_data = {
		tweet: '',
		account: ''
	};

  $scope.login = function(){
  	console.log('tw',$scope.twitter_credentials);
  	$http.get('/login',{
  		params: $scope.twitter_credentials
  	}).success(function(res){
  		if(res.success){
  			alert('logged!');
  			localStorage.setItem('token',res.token);
  			localStorage.setItem('tokenSecret',res.tokenSecret);
  			window.location.href = "https://twitter.com/oauth/authenticate?oauth_token=" + res.token;
  		}
  		else {
  			alert('not logged!');
  		}
  	});
  };

  $scope.start = function(){

  	$http.get('/start_marketing',{
  		params: {
  			accessToken: localStorage.getItem('accessToken'),
  			accessTokenSecret: localStorage.getItem('accessTokenSecret'),
  			tweet: $scope.twitter_marketing_data.tweet,
  			account: $scope.twitter_marketing_data.account
  		}
  	}).success(function(res){
  		if(res.success){
  			alert('marketing tool is in progress...');
  		}
  	});
  };

  $scope.getAccessToken = function(){
  	$http.get('/tw_access_token',{
  		params: {
  			token: localStorage.getItem('token'),
  			tokenSecret: localStorage.getItem('tokenSecret'),
  			oauth_verifier: localStorage.getItem('oauth_verifier')
  		}
  	}).success(function(res){
  		if(res.success){
  			console.log('got access token!');
  			localStorage.setItem('accessToken',res.accessToken);
  			localStorage.setItem('accessTokenSecret',res.accessTokenSecret);
  		}
  	});
  };

  $scope.getParameterByName = function(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};

  (function(){
  	// run on init
  	if($scope.getParameterByName('oauth_token').length>0){
	  	localStorage.setItem('oauth_token',$scope.getParameterByName('oauth_token'));
			localStorage.setItem('oauth_verifier',$scope.getParameterByName('oauth_verifier'));
			$scope.getAccessToken();
  	}
  })();
  
});