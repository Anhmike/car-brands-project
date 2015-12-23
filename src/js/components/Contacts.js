'use strict';

var React = require('react');

var Contacts = React.createClass({
    render: function () {
        return (
            <div className="text-center">
                <h1>Contact me (Savcho Stamenov)</h1>
                <ul className="list-unstyled">
                    <li>
                        <a href="https://www.linkedin.com/profile/view?id=AAIAAA3XmNcBCODSEtmC_DtgE4xxAfKuTirM52k"  target="blank_">LinkedIn profile</a>
                    </li>
                    <li>
                        <a href="https://github.com/sstamenovcode" target="blank_">GitHub profile</a>
                    </li>
                </ul>
            </div>
        )
    }
});

module.exports = Contacts;