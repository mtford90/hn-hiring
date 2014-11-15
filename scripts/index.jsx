/*global dev*/
/**
 * Entry point for the app.
 *
 * Here we:
 *     - setup the routing based on routes.jsx
 *     - pack all the stylesheets
 *     - render the react components
 */

var React = require('react'),
    conf = require('../app.config'),
    bootstrap = require('react-bootstrap'),
    routes = require('./routes');


var ContentWrapper = React.createClass({
    render: function () {
        return (
            <div className="container-fluid" role="main">
                    {this.props.children}
            </div>
        )
    }
});

var App = React.createClass({
    render: function () {
        return (
        <ContentWrapper>
            <this.props.activeRouteHandler/>
        </ContentWrapper>
        )
    }
});

/*********************/
/** Pack dem styles **/
/*********************/

require('./styles/vendor');
require('./styles/custom');
require('./styles/dev');

/***********************/
/** Configure Routing **/
/***********************/

var router = require('react-router')
    , Route = router.Route
    , Routes = router.Routes
    , Redirect = router.Redirect
    , NotFoundRoute = router.NotFoundRoute
    , DefaultRoute = router.DefaultRoute;

// the dev global variable is injected by a really simple custom webpack plugin.
var basePath = dev ? conf.basePath.dev : conf.basePath.prod;

var RouterComponent = (
    <Routes>
        <Route name="app" path={basePath} handler={App}>
            {routes.navigationItems.map(function (item, idx) {
                return (<Route name={item.text} handler={item.handler} key={idx}/>);
            })}
            <DefaultRoute handler={routes.NotFound}/>
            <NotFoundRoute handler={routes.NotFound}/>
            <Redirect path={basePath} to={routes.defaultRoute.text} />
        </Route>
    </Routes>
);

/********************/
/** Render the app **/
/********************/

React.render(RouterComponent, document.getElementById('wrapper'));