'use strict';

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var createHistory  = require('history/lib/createBrowserHistory');
var history = createHistory({
    queryKey: false
});
var App = require('./components/App');
var MainPage = require('./components/MainPage');
var Brands = require('./components/Brands');
var AddBrand = require('./components/AddBrand');
var EditBrand = require('./components/EditBrand');
var Contacts = require('./components/Contacts');
var NoMatch = require('./components/NoMatch');
var MainFooter = require('./components/MainFooter');

var routes = (
    <Router history={createHistory()}>
        <Route path="/" component={App}>
            <IndexRoute component={MainPage}/>
            <Route path="brands" component={Brands}>
                <Route path=":id" component={Brands}/>
            </Route>
            <Route path="brands/edit" component={EditBrand}>
                <Route path=":id" component={EditBrand}/>
            </Route>
            <Route path="add-brand" component={AddBrand}/>
            <Route path="contacts" component={Contacts}/>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
);

module.exports = routes;