'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
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

var setExpirationDate = function () {
    var currentDate = new Date();

    return currentDate.setHours(currentDate.getHours() + 7);
};

app.set('secret', 'my4Little55Secret');
app.set('views', __dirname + '/dist/views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(favicon(__dirname + '/img/favicon.ico'));

app.get(/^(?!\/api).+/, function(req, res) {
    res.render('index', {});
});

app.get('/api/brands', function(req, res) {
    Car.find({}).exec(function (err, cars) {
        if (err) return console.error(err);
        res.send(cars);
    });
});

app.post('/api/users/login', function(req, res) {
    var token;

    User.find({
        username: req.body.username,
        password: req.body.password
    }).exec(function (err, user) {
        if (err) return console.error(err);

        if (user.length > 0) {
            user[0].exp = setExpirationDate();
            token = jwt.sign(user[0], app.get('secret'));
            user[0].token = token;
        }

        res.send(user);
    });
});

app.get('/api/all-users', function(req, res) {
    User.find({}).exec(function (err, users) {
        if (err) return console.error(err);
        res.send(users);
    });
});

app.post('/api/user', function(req, res) {
    var user = new User(req.body),
        token;

    user.save(function (err, user) {
        if (err) return console.error(err);
        user.exp = setExpirationDate();
        token = jwt.sign(user, app.get('secret'));
        user.token = token;
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

