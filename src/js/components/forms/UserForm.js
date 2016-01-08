'use strict';

var React = require('react');
var Actions = require('./../../actions/actions');
var Panel = require('react-bootstrap').Panel;
var RestApi = require('./../../routes/cars');
var Link = require('react-router').Link;
var toastr = require('toastr');

var UserForm = React.createClass({
    getInitialState: function () {
      return {
          username: '',
          password: ''
      }
    },
    handleInputUsername: function (e) {
        this.setState({
            username: e.target.value
        });
    },
    handleInputPassword: function (e) {
        this.setState({
            password: e.target.value
        });
    },
    userLogin: function (e) {
        e.preventDefault();

        RestApi.login({
            username: this.state.username,
            password: this.state.password
        }).then(function(user) {
            if (user.length === 0) {
                toastr.error('Wrong user/password')
            } else {
                Actions.loginUser(user);
            }
        }).catch(function(err) {
            console.log('Error logging in', err);
        });
    },
    logoutUser: function(e) {
        e.preventDefault();

        Actions.logoutUser();
        this.setState({
            username: '',
            password: ''
        });
    },
    render: function () {
        if (this.props.loggedUser && this.props.loggedUser.username) {
            return (
                <div className="col-md-4 vertical-padding">
                    <Panel>
                        <div>
                            Welcome, {this.props.loggedUser.username}
                        </div>
                        <div>
                            <a href="#" onClick={this.logoutUser}>Logout</a>
                        </div>
                    </Panel>
                </div>
            )
        } else {
            return (
                <div className="col-md-4 vertical-padding">
                    <Panel>
                        <form className="form-horizontal horizontal-padding" onSubmit={this.userLogin}>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    value={this.state.username}
                                    className="form-control"
                                    id="username"
                                    placeholder="Your username..."
                                    onChange={this.handleInputUsername}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    value={this.state.password}
                                    className="form-control"
                                    id="password"
                                    placeholder="Your password..."
                                    onChange={this.handleInputPassword}/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-warning btn-block">Login</button>
                            </div>
                            <div className="form-group">
                                <Link to={"/register"}>Register</Link>
                            </div>
                        </form>
                    </Panel>
                </div>
            )
        }
    }
});

module.exports = UserForm;
