// (C) 2015 Gal Dubitski
//
// Twitter Marketing Tool - Node Server

var express = require('express');
var http = require('http');
var app = express();
var api = require('./api');

////////// INITIAL APP DETAILS //////////

var APP_KEY = process.env.TW_APP_KEY;
var USERNAME = process.env.TW_USERNAME;
var PASSWORD = process.env.TW_PASSWORD;
var PORT = 8080;
var HOST_API = 'http://localhost:'+PORT;


////////// WEB FOLDER //////////

app.use('/web',express.static(__dirname + '/web', {
  maxAge : 0
}));

////////// NODE API //////////

app.get('/login', function (Req, Res) {
  api.login(Req.query,function(ok,token,tokenSecret){
    Res.json({ success: ok, token: token, tokenSecret: tokenSecret});
  });
});

app.get('/tw_access_token', function (Req, Res) {
  api.getAccessToken(Req.query,function(ok,accessToken,accessTokenSecret){
    Res.json({ success: ok, accessToken: accessToken, accessTokenSecret: accessTokenSecret});
  });
});

app.get('/twcallback', function (Req, Res) {
  console.log('received: ',Req.query);
  Res.redirect('/web?oauth_token='+Req.query.oauth_token+'&oauth_verifier='+Req.query.oauth_verifier);
});

app.get('/start_marketing', function (Req, Res) {
  api.startMarketing(Req.query,function(ok){
    Res.json({ success: ok });
  });
});


////////// STARTING SERVER //////////

app.listen(PORT);

console.log("Node.js is running in " + app.get('env') + " on port " + PORT);

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});
