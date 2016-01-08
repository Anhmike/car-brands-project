'use strict';

var React = require('react');
var Actions = require('./../../actions/actions');
var Panel = require('react-bootstrap').Panel;

var LoggedUserForm = React.createClass({
    logoutUser: function(e) {
        e.preventDefault();

        Actions.logoutUser();
    },
    render: function () {
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
    }
});

module.exports = LoggedUserForm;
