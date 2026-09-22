//Funcion para manejar errores en la aplicaicon
//var.createError = require('http-errors');
import createError from 'http-errors';
//importa el framework axpress
import express from 'express';
//var express = require('express');
//importa modulos para manejar rutas (path)
import path from 'node:path';
//var path = require('path');
//para kokies
import cookieParser from 'cookie-parser';
//var cookieParser = require('cookie-parser');
//restro para saber que pasa en el servidor Morgan
import logger from 'morgana';
//var registrador = require('morgan');

//se importan las rutas de la aplicación
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//crea la aplicación de express
var app = express();

//configura el motor de vistas
app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'hbs');


//configura los midlewaves de la aplicación
app.use(logger('dev'));
app.use(express.json());

//configuración de archivos estáticos
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..','public')));

//registramos las rutas 
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
