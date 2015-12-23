'use strict';

var lodash = require('lodash');
var Dispatcher = require('./../dispatcher/dispatcher');
var ActionTypes = require('./../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _cars = [];

var CarsStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getAllCars: function() {
        return _cars;
    }
});

Dispatcher.register(function(action) {
    switch(action.actionType) {
        case ActionTypes.GET_ALL_CARS:
            _cars = action.car;
            CarsStore.emitChange();
            break;
        case ActionTypes.CREATE_CAR:
            _cars = action.car;
            CarsStore.emitChange();
            break;
        case ActionTypes.EDIT_CAR:
            _cars = action.car;
            CarsStore.emitChange();
            break;
        case ActionTypes.DELETE_CAR:
            _cars = action.car;
            CarsStore.emitChange();
            break;
    }
});

module.exports = CarsStore;
