var express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    proxy = require('simple-http-proxy');
	
module.exports = function() {
	var app = express();
	app.use('/', express.static(__dirname + '\\app'));
	

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use(function(req, res, next) {
	  res.setHeader('Access-Control-Allow-Origin', '*');
	  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	  
	});
	
	return app;
}