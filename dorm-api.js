const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./models/config');
const users = require('./controllers/users');

var app = express(); 

//checks $NODE_ENV for development environment (ie. not production)
if (app.get('env') === 'development') var dev = true;

// log if in dev mode
if (dev) app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//================================================
// Routes
//================================================
app.get('/users', users.getUsers);
// this should merge conflict
app.get('/users/:id', users.getUserById);
app.post('/users', users.createUser);

// handle 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    //who knows
    err.status = 404;
    next(err);
});

// development error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500).send();
    });
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send();
});

var server = app.listen(config.port);
console.log('Listening at http://localhost:%s in %s mode',
    server.address().port, app.get('env'));

module.exports = app;

