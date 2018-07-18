var express = require("express");
var bodyParser = require("body-parser");
var passport = require("./config/login-routes");
var expressValidator = require('express-validator');
var session = require('express-session');

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true

}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

require("./routes/routes.js")(app);
require('./routes/html-routes.js')(app);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});