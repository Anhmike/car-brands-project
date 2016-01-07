'use strict';

var React = require('react');
var Actions = require('./../actions/actions');
var toastr = require('toastr');

var Register = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            password: ''
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
    registerUser: function (e) {
        e.preventDefault();

        Actions.registerUser({
            username: this.state.username,
            password: this.state.password
        });
    },
    render: function () {
        return (
            <div>
                <form className="form-horizontal col-lg-8 col-lg-offset-2 custom-padding" onSubmit={this.registerUser}>
                    <h1 className="text-center margin-bottom">Register</h1>
                    <div className="form-group">
                        <label htmlFor="brand">Username:</label>
                        <input
                            type="text"
                            value={this.state.username}
                            className="form-control"
                            id="username"
                            placeholder="Enter your username..."
                            onChange={this.handleUsernameInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">Password:</label>
                        <input
                            type="text"
                            value={this.state.password}
                            className="form-control"
                            id="password"
                            placeholder="Enter your password..."
                            onChange={this.handlePasswordInput}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-warning btn-lg">Register</button>
                    </div>
                </form>
            </div>
        )
    }
});

module.exports = Register;