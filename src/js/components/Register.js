'use strict';

var React = require('react');
var _ = require('lodash');
var Actions = require('./../actions/actions');
var RestApi = require('./../routes/cars');
var History = require('react-router').History;
var Panel = require('react-bootstrap').Panel;
var toastr = require('toastr');

var Register = React.createClass({
    mixins: [History],
    getInitialState: function () {
        return {
            username: '',
            password: '',
            retypedPassword: ''
        }
    },
    handleUsernameInput: function (e) {
        this.setState({
            username: e.target.value
        });
    },
    handlePasswordInput: function (e) {
        this.setState({
            password: e.target.value
        });
    },
    handleRetypedPasswordInput: function (e) {
        this.setState({
            retypedPassword: e.target.value
        });
    },
    registerUser: function (e) {
        e.preventDefault();
        var that = this,
            currentUser,
            isUserExisting,
            i,
            a,
            checkIfUserExists = function (users) {
                for (i = 0, a = users.length; i < a; i++) {
                    currentUser = users[i];

                    if (currentUser.username === that.state.username) {
                        isUserExisting = true;
                        break;
                    }
                }

                return isUserExisting;
            };

        RestApi.get('/api/all-users').then(function(users) {
            if (checkIfUserExists(users)) {
                toastr.error('Username already exists!');
                return;
            }

            if (that.state.password !== that.state.retypedPassword) {
                toastr.error('Passwords do not match!');
                return;
            }

            Actions.registerUser({
                username: that.state.username,
                password: that.state.password
            });

            that.history.pushState(null, '/');
            toastr.success('You have successfully registered!');
        });
    },
    render: function () {
        return (
            <div>
                <Panel>
                    <form className="form-horizontal col-lg-8 col-lg-offset-2 custom-padding" onSubmit={this.registerUser}>
                        <h1 className="text-center margin-bottom">Register</h1>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                value={this.state.username}
                                className="form-control"
                                id="username"
                                placeholder="Enter your username..."
                                onChange={this.handleUsernameInput}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                value={this.state.password}
                                className="form-control"
                                id="password"
                                placeholder="Enter your password..."
                                onChange={this.handlePasswordInput}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="retypedPassword">Confirm password:</label>
                            <input
                                type="password"
                                value={this.state.retypedPassword}
                                className="form-control"
                                id="retypedPassword"
                                placeholder="Confirm your password..."
                                onChange={this.handleRetypedPasswordInput}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-warning btn-lg">Register</button>
                        </div>
                    </form>
                </Panel>
            </div>
        )
    }
});

module.exports = Register;