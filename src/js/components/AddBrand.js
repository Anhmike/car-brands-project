'use strict';

var React = require('react');
var $ = require('jquery');
var Actions = require('./../actions/actions');
var History = require('react-router').History;
var Panel = require('react-bootstrap').Panel;
var toastr = require('toastr');

var AddBrand = React.createClass({
    mixins: [History],
    getInitialState: function () {
        return {
            brand: '',
            description: '',
            logo: '',
            thumbnail: '',
            errors: {}
        }
    },
    handleBrandInput: function (e) {
        this.setState({
            brand: e.target.value
        });
    },
    handleLogoInput: function (e) {
        var userInput = e.target.value,
            imageLogo = $("#thumbnail");

        if (/(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))/.test(userInput)) {
            imageLogo.removeClass('hidden');

            this.setState({
                thumbnail: e.target.value,
                errors: {
                    logo: ''
                }
            });
        } else {
            imageLogo.addClass('hidden');

            this.setState({
                thumbnail: ''
            });
        }

        this.setState({
            logo: e.target.value
        });
    },
    handleDescriptionInput: function (e) {
        this.setState({
            description: e.target.value
        });
    },
    checkIfImageIsShown: function () {
        var isShown = false,
            imageLogo = $("#thumbnail");

        if (imageLogo.outerHeight() >= 100 && imageLogo.outerWidth() >= 100) {
            isShown = true;
        } else {
            imageLogo.addClass('hidden');
        }

        return isShown;
    },
    checkIfFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {};

        if (this.state.brand.length < 3) {
            this.state.errors.brand = 'Brand name must be at least 3 characters.';
            formIsValid = false;
        }

        if (!this.checkIfImageIsShown()) {
            this.state.errors.logo = 'Brand logo must be a valid URL.';
            formIsValid = false;
        }

        if (this.state.description.length < 20) {
            this.state.errors.description = 'Brand description must be at least 20 characters.';
            formIsValid = false;
        }

        this.setState({
            errors: this.state.errors
        });

        return formIsValid;
    },
    addBrand: function (e) {
        e.preventDefault();

        if (!this.checkIfFormIsValid()) {
            return;
        }

        Actions.createCar({
            name: this.state.brand,
            description: this.state.description,
            logo: this.state.logo
        });

        toastr.success('Brand successfuly added!');
        this.history.pushState(null, '/brands');
    },
    render: function () {
        return (
            <Panel>
                <form className="form-horizontal col-lg-8 col-lg-offset-2 custom-padding" onSubmit={this.addBrand}>
                    <h1 className="text-center margin-bottom">Add New Brand</h1>
                    <div className="form-group">
                        <label htmlFor="brand">Brand name:</label>
                        <input
                            type="text"
                            value={this.state.brand}
                            className="form-control"
                            id="brand"
                            placeholder="Enter car brand here..."
                            onChange={this.handleBrandInput}/>
                        <div className="input-error">{this.state.errors.brand}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="logo">Logo:</label>
                        <input
                            type="text"
                            value={this.state.logo}
                            className="form-control"
                            id="logo"
                            placeholder="Enter external logo URL here..."
                            onChange={this.handleLogoInput}/>
                    </div>
                    <div className="form-group">
                        <img src={this.state.thumbnail} className="img-responsive hidden" id="thumbnail"/>
                        <div className="input-error">{this.state.errors.logo}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            value={this.state.description}
                            className="form-control"
                            id="description"
                            placeholder="Enter car description here..."
                            onChange={this.handleDescriptionInput}/>
                        <div className="input-error">{this.state.errors.description}</div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-warning btn-lg">Add Brand</button>
                    </div>
                </form>
            </Panel>
        )
    }
});

module.exports = AddBrand;
