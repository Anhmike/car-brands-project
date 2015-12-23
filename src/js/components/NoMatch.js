'use strict';

var React = require('react');

var NoMatch = React.createClass({
    render: function () {
        return (
            <div>
                <h1 className="text-center">Page Not Found</h1>
            </div>
        )
    }
});

module.exports = NoMatch;