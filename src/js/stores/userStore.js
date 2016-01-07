'use strict';

var lodash = require('lodash');
var Dispatcher = require('./../dispatcher/dispatcher');
var ActionTypes = require('./../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var usersStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getUser: function() {
        var _user = localStorage.getItem('user');

        if (_user && _user !== 'undefined') {
            return JSON.parse(_user);
        }

        return null;
    }
});

Dispatcher.register(function(action) {
    switch(action.actionType) {
        case ActionTypes.USER_LOGGED_IN:
            localStorage.setItem('user', JSON.stringify(action.user[0]));
            usersStore.emitChange();
            break;
        case ActionTypes.USER_LOGGED_OUT:
            localStorage.removeItem('user');
            usersStore.emitChange();
            break;
        case ActionTypes.USER_REGISTERED:
            localStorage.setItem('user', JSON.stringify(action.user));
            usersStore.emitChange();
            break;
    }
});

module.exports = usersStore;
