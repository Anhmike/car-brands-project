'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var app = express();
var mongoose = require('mongoose');
require('./src/js/models/car');
var db = mongoose.createConnection('mongodb://admin:topgun333@ds055574.mongolab.com:55574/initialdb');

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function (callback) {
    console.info('DB connected');
});

var Car = db.model('Car');

app.set('port', (9876));
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

app.get('/new-brand', function(req, res) {
    res.render('index', {});
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

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

