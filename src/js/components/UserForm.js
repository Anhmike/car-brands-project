'use strict';

var React = require('react');
var Panel = require('react-bootstrap').Panel;

var UserForm = React.createClass({
    getInitialState: function () {
      return {
          input: ''
      }
    },
    handleInputUsername: function (e) {
        this.setState({
            input: e.target.value
        });
    },
    userLogin: function (e) {
        e.preventDefault();
        console.log('Logging', this.state.username);
    },
    render: function () {
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
                    </form>
                </Panel>
            </div>
        )
    }
});

module.exports = UserForm;