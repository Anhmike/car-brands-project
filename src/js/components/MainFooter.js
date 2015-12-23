'use strict';

var React = require('react');

var MainFooter = React.createClass({
    render: function () {
        return (
            <div className="bkgr-navbar">
                <div className="navbar-inner">
                    <div className="container text-center vertical-padding">
                        This site is made by <a href="https://github.com/sstamenovcode" target="blank_">Savcho Stamenov</a>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = MainFooter;
