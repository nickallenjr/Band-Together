var path = require("path");
var request = require('request');
var passport = require('../config/login-routes');
var db = require('../models')


module.exports = function(app) {
	//Api Routes
	app.post('/api/login', passport.authenticate('local'), function(req, res) {
		res.json('/members')
	});

	app.post('/api/register', function(req, res) {
		db.User.create({
			email: req.body.email,
			password: req.body.password
		}).then(function() {
			res.redirect(307, '/api/login');
		}).catch(function(err) {
			res.json(err);
		})
	});

	app.get('/api/savedBand', function(req, res) {
		db.Band.findAll({}).then(function(results) {
			res.json(results);
		})
	})

	app.get('/api/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get("/api/user_data", function(req, res) {
		if (!req.user) {
			res.json({});
		}
		else {
			res.json({
				email: req.user.email,
				id: req.user.id
			});
		}
	});

	app.post('/api/bands', function(req, res) {
		db.Band.create({
			bandName: req.body.bandName,
			UserId: req.body.userId
		}).then(function(results) {
			console.log(results);
		})
	})

	//Spotify Routes
	var client_id = '977af0fc81734cad8b087e49d2597c42'; // Your client id
	var client_secret = 'c6d73d59372241198af8835721ef0f97'; // Your secret

	app.get('/api/spotify', function(req, res) {
		// your application requests authorization
		var authOptions = {
		  url: 'https://accounts.spotify.com/api/token',
		  headers: {
		    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
		  },
		  form: {
		 	 grant_type: 'client_credentials'
		  },
		  json: true
		};
 
 		request.post(authOptions, function(error, response, body) {
 		  console.log(error);
		  if (!error && response.statusCode === 200) {
		  	res.json(body.access_token);
		  	console.log(body.access_token);
		  }
		});
	})
}


