var mongoose = require('mongoose');
var express = require('express');
var formidable = require('formidable');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

require('./app_api/models/db');
const index = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var path = require('path');
//  var filename = path.join(__dirname,'../upload/' ...

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/api', apiRoutes);
app.use('/api/data', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log ("************ app route is: ", app.index  );
  const err = new Error('Not Found');
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

app.listen(3000);
module.exports = app;