'use strict';

var React = require('react');
var LoginForm = require('./LoginForm');
var LoggedUserForm = require('./LoggedUserForm');

var UserForm = React.createClass({
    render: function () {
        if (this.props.loggedUser && this.props.loggedUser.token) {
            return (
                <LoggedUserForm data={this.props.data} loggedUser={this.props.loggedUser} />
            )
        } else {
            return (
                <LoginForm data={this.props.data} loggedUser={this.props.loggedUser} />
            )
        }
    }
});

module.exports = UserForm;
