'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./routes');

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(routes, document.getElementById('app'));
});