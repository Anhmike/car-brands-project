'use strict';

var Dispatcher = require('./../dispatcher/dispatcher');
var actionTypes = require('./../constants/actionTypes');
var RestApi = require('./../routes/cars');

var Actions = {
    getAllCars: function() {
        RestApi.get('/api/brands').then(function(data) {
            Dispatcher.dispatch({
                actionType: actionTypes.GET_ALL_CARS,
                car: data
            });
        });
    },
    createCar: function(car) {
        RestApi.post('/api/brands', car).then(function(data) {
            Dispatcher.dispatch({
                actionType: actionTypes.CREATE_CAR,
                car: data
            });
        });
    },
    editCar: function(car) {
        RestApi.put('/api/brands/' + car.id, car).then(function(data) {
            Dispatcher.dispatch({
                actionType: actionTypes.EDIT_CAR,
                car: data
            });
        });
    },
    deleteCar: function(id) {
        RestApi.del('/api/brands/' + id).then(function(data) {
            Dispatcher.dispatch({
                actionType: actionTypes.DELETE_CAR,
                car: data
            });
        });
    },
    loginUser: function(user) {
        Dispatcher.dispatch({
            actionType: actionTypes.USER_LOGGED_IN,
            user: user
        });
    },
    logoutUser: function() {
        Dispatcher.dispatch({
            actionType: actionTypes.USER_LOGGED_OUT
        });
    },
    registerUser: function(user) {
        RestApi.post('/api/user', user).then(function(data) {
            Dispatcher.dispatch({
                actionType: actionTypes.USER_REGISTERED,
                user: data
            });
        });
    }
};

module.exports = Actions;