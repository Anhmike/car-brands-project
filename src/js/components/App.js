'use strict';

var React = require('react');
var MainNavbar = require('./MainNavbar');
var MainFooter = require('./MainFooter');
var UserForm = require('./UserForm');
var CarStore = require('./../stores/carStore');
var UserStore = require('./../stores/userStore');
var Actions = require('./../actions/actions');

var App = React.createClass({
    getInitialState: function() {
        return {
            data: CarStore.getAllCars(),
            loggedUser: UserStore.getUser()
        }
    },
    componentWillMount: function () {
        CarStore.addChangeListener(this._onChangeData);
        UserStore.addChangeListener(this._onChangeUser);
    },
    componentWillUnmount: function () {
        CarStore.removeChangeListener(this._onChangeData);
        UserStore.removeChangeListener(this._onChangeUser);
    },
    componentDidMount: function () {
        Actions.getAllCars();
    },
    _onChangeData: function () {
      this.setState({
          data: CarStore.getAllCars()
      });
    },
    _onChangeUser: function () {
        this.setState({
            loggedUser: UserStore.getUser()
        });
    },
    render: function () {
        return (
            <div>
                <MainNavbar />
                <div className="container site-main-container remove-padding-bottom">
                    <div className="full-height">
                        <div>
                            <img src="/img/car.jpg" className="img-responsive" alt="logo" />
                        </div>
                        <div className="custom-padding clearfix">
                            <div className="col-md-8 vertical-padding">
                                {this.state.loggedUser ? <p>{this.state.loggedUser.username} is logged in</p> : ''}
                                {React.cloneElement(this.props.children, {data: this.state.data, loggedUser: this.state.loggedUser})}
                            </div>
                            <UserForm />
                        </div>
                    </div>
                </div>
                <MainFooter />
            </div>
        )
    }
});

module.exports = App;