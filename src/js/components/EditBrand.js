'use strict';

var React = require('react');
var $ = require('jquery');
var _ = require('lodash');
var Actions = require('./../actions/actions');
var RestApi = require('./../routes/cars');
var Panel = require('react-bootstrap').Panel;
var History = require('react-router').History;
var toastr = require('toastr');

var EditBrand = React.createClass({
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
    componentDidMount: function() {
        RestApi.get('/api/brands/').then(function(data) {
            var currentBrand = _.find(data, {_id: this.props.params.id});

            if (this.isMounted()) {
                this.setState({
                    brand: currentBrand.name,
                    logo: currentBrand.logo,
                    thumbnail: currentBrand.logo,
                    description: currentBrand.description
                });
            }
        }.bind(this));
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
    editBrand: function (e) {
        e.preventDefault();

        if (!this.checkIfFormIsValid()) {
            return;
        }

        if (!this.props.loggedUser) {
            toastr.error('You must be logged in to edit a brand!');
            return;
        }

        Actions.editCar({
            _id: this.props.params.id,
            name: this.state.brand,
            description: this.state.description,
            logo: this.state.logo
        });

        toastr.success('Brand successfully edited!');
        this.history.pushState(null, '/brands');
    },
    render: function () {
        var that = this,
            displayBrandInfo = this.props.data.map(function (car) {
                if (car._id === that.props.params.id) {
                    return (
                        <div key={car._id}>
                            <Panel>
                                <form className="form-horizontal col-lg-8 col-lg-offset-2 custom-padding" onSubmit={that.editBrand}>
                                    <h1 className="text-center margin-bottom">Edit '{car.name}'</h1>
                                    <div className="form-group">
                                        <label htmlFor="brand">Brand name:</label>
                                        <input
                                            type="text"
                                            value={that.state.brand}
                                            className="form-control"
                                            id="brand"
                                            placeholder="Enter car brand here..."
                                            onChange={that.handleBrandInput}/>
                                        <div className="input-error">{that.state.errors.brand}</div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="logo">Logo:</label>
                                        <input
                                            type="text"
                                            value={that.state.logo}
                                            className="form-control"
                                            id="logo"
                                            placeholder="Enter external logo URL here..."
                                            onChange={that.handleLogoInput}/>
                                    </div>
                                    <div className="form-group">
                                        <img src={that.state.thumbnail} className="img-responsive" id="thumbnail"/>
                                        <div className="input-error">{that.state.errors.logo}</div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description:</label>
                                        <input
                                            type="text"
                                            value={that.state.description}
                                            className="form-control"
                                            id="description"
                                            placeholder="Enter car description here..."
                                            onChange={that.handleDescriptionInput}/>
                                        <div className="input-error">{that.state.errors.description}</div>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-warning btn-lg">Edit Brand</button>
                                    </div>
                                </form>
                            </Panel>
                        </div>
                    );
                }
            });

        return (
            <div>
                {displayBrandInfo}
            </div>
        )
    }
});

module.exports = EditBrand;