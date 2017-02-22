var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var authroute = require("./routes/url_auth.js");
var users = require('./routes/url_users');
var secteurs = require('./routes/url_secteurs');
var agences = require('./routes/url_agences');
var produits = require('./routes/url_produits_infos');
var tarif_produits = require('./routes/url_tarif_produits');
var tva_produits = require('./routes/url_tva');
var tarif_produits_level = require('./routes/url_tarif_produits_level');


var sphereapi = express();

sphereapi.use(logger('dev'));
sphereapi.use(bodyParser.json());
sphereapi.use(bodyParser.urlencoded({ extended: false }));
sphereapi.use(cookieParser());
sphereapi.use(express.static(path.join(__dirname, 'public')));

sphereapi.set('views', path.join(__dirname, 'views'));
sphereapi.set('view engine', 'ejs');

sphereapi.use('/', users);
sphereapi.use('/', secteurs);
sphereapi.use('/', agences);
sphereapi.use('/', produits);
sphereapi.use('/', tarif_produits);
sphereapi.use('/', tva_produits);
sphereapi.use('/', tarif_produits_level);
sphereapi.use('/', authroute);

// catch 404 and forward to error handler
sphereapi.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
sphereapi.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = sphereapi;
