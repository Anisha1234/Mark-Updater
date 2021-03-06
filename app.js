var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require("path");

var index = require('./routes/index');
var result = require('./routes/result');
var login = require('./routes/login');
var signup = require('./routes/signup');

var app = express();
var database = require('./database.js');

database.connection.connect(function(err) {
  if (err) throw err;
  console.log("Database is now connected!");
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setup route
app.use('/',index);
app.use('/result',result);
app.use('/login',login);
app.use('/signup',signup);

//setup ejs
app.set('view engine','ejs');
app.set('views',__dirname+'/views')

//set static files(css or js or imgs)
app.use(express.static(__dirname + "/public"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
