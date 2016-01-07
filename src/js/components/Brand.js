'use strict';

var React = require('react');
var Link = require('react-router').Link;
var Actions = require('./../actions/actions');
var Panel = require('react-bootstrap').Panel;
var History = require('react-router').History;
var swal = require('sweetalert');

var Brand = React.createClass({
    mixins: [History],
    getInitialState: function () {
        return {
            data: this.props.data
        }
    },
    deleteBrand: function(id, e) {
        var that = this;

        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "You will delete this brand!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {
            swal("Deleted!", "Brand has been deleted.", "success");
            Actions.deleteCar(id);
            that.history.pushState(null, '/brands');
        });
    },
    render: function () {
        var that = this,
            displayBrandInfo = this.props.data.map(function (car) {
                if (car._id === that.props.id) {
                    return (
                        <div key={car._id}>
                            <Panel>
                                <h1>
                                    {car.name}
                                    {function(){
                                        if (that.props.loggedUser && that.props.loggedUser.username) {
                                            return (
                                                <span>
                                                    <a href="#" onClick={that.deleteBrand.bind(that, car._id)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                                                    <Link to={"/brands/edit/" + car._id}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Link>
                                                </span>
                                            );
                                        }
                                    }.call(that)}
                                </h1>
                                <img src={car.logo} className="img-responsive" alt="logo"/>
                                <p>{car.description}</p>
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

module.exports = Brand;