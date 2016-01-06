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
        CarStore.addChangeListener(this._onChange);
        UserStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        CarStore.removeChangeListener(this._onChange);
        UserStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function () {
        Actions.getAllCars();
    },
    _onChange: function () {
      this.setState({
          data: CarStore.getAllCars(),
          loggedUser: UserStore.getUser().username
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
                                <p>{this.state.loggedUser} is logged in</p>
                                {React.cloneElement(this.props.children, {data: this.state.data})}
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