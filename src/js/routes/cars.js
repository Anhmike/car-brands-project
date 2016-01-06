var $ = require('jquery');
var Promise = require('es6-promise').Promise;

module.exports = {
    get: function(url) {
        return new Promise(function(success, error) {
            $.ajax({
                url: url,
                dataType: 'json',
                success: success,
                error: error
            });
        });
    },
    post: function(url, data) {
        return new Promise(function(success, error) {
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'POST',
                data: data,
                success: success,
                error: error
            });
        });
    },
    put: function(url, data) {
        return new Promise(function(success, error) {
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'PUT',
                data: data,
                success: success,
                error: error
            });
        });
    },
    del: function(url) {
        return new Promise(function(success, error) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: success,
                error: error
            });
        });
    },
    login: function(data) {
        return new Promise(function(success, error) {
            $.ajax({
                url: 'users/login',
                dataType: 'json',
                type: 'POST',
                data: data,
                success: success,
                error: error
            });
        });
    }
};