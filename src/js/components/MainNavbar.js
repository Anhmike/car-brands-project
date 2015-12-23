'use strict';

var React = require('react');
var Link = require('react-router').Link;
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;

var MainNavbar = React.createClass({
    render: function () {
        return (
            <Navbar inverse className="bkgr-navbar navbar-static-top">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Home</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="http://localhost:9876/brands">Brands</NavItem>
                        <NavItem eventKey={2} href="http://localhost:9876/new-brand">Add Brand</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">Contacts</NavItem>
                        <NavItem eventKey={2} href="#">F.A.Q.</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
});

module.exports = MainNavbar;