'use strict';

var React = require('react');
var Link = require('react-router').Link;
var Panel = require('react-bootstrap').Panel;

var AllBrands = React.createClass({
    render: function () {
        var displayAllBrandsInfo = this.props.data.map(function(car) {
                return (
                    <div key={car._id}>
                        <Panel>
                            <h1>{car.name}</h1>
                            <img src={car.logo} className="img-responsive" alt="logo" />
                            <p>{car.description}</p>
                            <div className="text-right">
                                <Link to={"/brands/" + car._id}>Read more</Link>
                            </div>
                        </Panel>
                    </div>
                );
            });

        return (
            <div>
                {displayAllBrandsInfo}
            </div>
        )
    }
});

module.exports = AllBrands;