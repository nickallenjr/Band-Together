var path = require("path");
var isAuthenticated = require("../config/middleware/isAuth.js");


module.exports = function(app) {
	
	app.get('/', function(req, res) {
		if (req.user) {
			res.redirect('/members')
		}
		res.sendFile(path.join(__dirname, '../public/index.html'));
	})

	app.get('/members', isAuthenticated, function(req, res) {
		res.sendFile(path.join(__dirname, '../public/layout333.html'))
	})
}