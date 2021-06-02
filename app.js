var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');



var gravimetric_valuesRouter = require('./routes/gravimetric_values');
var basic_conceptsRouter = require('./routes/basic_concepts');
var contactRouter = require('./routes/contact');
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var official_websitesRouter = require('./routes/official_websites');
var calculatorsRouter = require('./routes/calculators');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter);
app.use('/basic_concepts', basic_conceptsRouter);
app.use('/gravimetric_values', gravimetric_valuesRouter);
app.use('/official_websites', official_websitesRouter);
app.use('/calculators', calculatorsRouter);
app.use('/calculators/prueba2', calculatorsRouter);
app.use('/calculators/prueba', calculatorsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));});

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
