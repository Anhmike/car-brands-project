'use strict';

var React = require('react');
var AllBrands = require('./AllBrands');
var Brand = require('./Brand');

var Brands = React.createClass({
    render: function () {
        if (this.props.params.id) {
            return (
                <Brand data={this.props.data} loggedUser={this.props.loggedUser} id={this.props.params.id}/>
            )
        } else {
            return (
                <AllBrands data={this.props.data} loggedUser={this.props.loggedUser} id={this.props.params.id}/>
            )
        }
    }
});

module.exports = Brands;