'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var app = express();
var mongoose = require('mongoose');
require('./src/js/models/car');
require('./src/js/models/user');
var db = mongoose.createConnection('mongodb://admin:topgun333@ds055574.mongolab.com:55574/initialdb');

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function () {
    console.info('DB connected');
});

var Car = db.model('Car');
var User = db.model('User');

app.set('views', __dirname + '/dist/views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(favicon(__dirname + '/img/favicon.ico'));

app.get('/', function(req, res) {
    res.render('index', {});
});

app.get('/brands', function(req, res) {
    res.render('index', {});
});

app.get('/add-brand', function(req, res) {
    res.render('index', {});
});

app.get('/api/brands', function(req, res) {
    Car.find({}).exec(function (err, cars) {
        if (err) return console.error(err);
        res.send(cars);
    });
});

app.get('/contacts', function(req, res) {
    res.render('index', {});
});

app.get('/brands/:id', function(req, res) {
    res.render('index', {});
});

app.get('/brands/edit/:id', function(req, res) {
    res.render('index', {});
});

app.get('/api/brands', function(req, res) {
    Car.find({}).exec(function (err, cars) {
        if (err) return console.error(err);
        res.send(cars);
    });
});

app.get('/register', function(req, res) {
    res.render('index', {});
});

app.post('/users/login', function(req, res) {
    User.find({
        username: req.body.username,
        password: req.body.password
    }).exec(function (err, user) {
        if (user.length > 0) {
            var authCode = Math.floor(Math.random() * (1000 - 1)) + 1;
            user[0].authCode = authCode;
        }

        res.send(user);
    });
});

app.post('/api/user', function(req, res) {
    var user = new User(req.body);

    user.save(function (err, user) {
        if (err) return console.error(err);
        res.send(user);
    });
});

app.post('/api/brands', function(req, res) {
    var brand = new Car(req.body);

    brand.save(function (err) {
        if (err) return console.error(err);
        Car.find({}).exec(function (err, cars) {
            if (err) return console.error(err);
            res.send(cars);
        });
    });
});

app.put('/api/brands/:id', function(req, res) {
    Car.findOneAndUpdate({_id: req.body._id}, req.body, {upsert: true}, function() {
        Car.find({}).exec(function (err, cars) {
            if (err) return console.error(err);
            res.send(cars);
        });
    });
});

app.delete('/api/brands/:id', function(req, res) {
    Car.where().findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) return console.error(err);
        Car.find({}).exec(function (err, cars) {
            if (err) return console.error(err);
            res.send(cars);
        });
    });
});

app.use(function(req, res){
    res.status(404).render('index');
});

app.listen(process.env.PORT || 9876, function() {
    console.log('Server started: http://localhost:' + (process.env.PORT || 9876) + '/');
});

