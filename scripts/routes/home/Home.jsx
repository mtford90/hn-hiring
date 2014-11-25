/**
 * The home route renders a Jumbotron and a list of features that are listed in ./data.jsx
 */

var React = require('react')
    , router = require('react-router')
    , Link = router.Link
    , bootstrap = require('react-bootstrap')
    , Row = bootstrap.Row
    , Col = bootstrap.Col
    , data = require('./data')
    , HackerNews = require('../../data')
    , config = require('../../../app.config')
    , DocumentTitle = require('react-document-title')
    , Jumbotron = bootstrap.Jumbotron;

/**
 * A feature consists of an icon, title and description and describes a feature of red-hot-react.
 * @type {ReactComponent}
 */
var Feature = React.createClass({
    render: function () {
        return (
            <div className="feature">
                <div className="row title-row">
                    <i className={this.props.opts.icon}></i>
                    <span className="title">{this.props.opts.title}</span>
                </div>
                <div className="row">
                    <p className="description">{this.props.opts.description}</p>
                </div>
            </div>
        );
    }
});

/**
 * The features components takes a list of feature data and renders a bootstrap grid of Feature
 * components. (3 per row).
 * @type {ReactComponent}
 */
var Features = React.createClass({
    render: function () {
        var i, j, tempArray, chunkedFeatures = [], chunk = 3;
        for (i = 0, j = this.props.features.length; i < j; i += chunk) {
            tempArray = this.props.features.slice(i, i + chunk);
            chunkedFeatures.push(tempArray);
        }
        return (
            <div>
                {chunkedFeatures.map(function (featureRow, i) {
                    return (
                        <Row className="feature-row">
                            {featureRow.map(function (feature, j) {
                                return (
                                    <Col md="4" className="feature-col">
                                        <Feature key={i * j} opts={feature}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    );
                })}
            </div>
        )
    }
});

var Home = React.createClass({
    render: function () {
        var comments = this.state.comments;
        console.log('render comments', comments);
        var loading = this.state.isLoading;
        return (
            <DocumentTitle title={config.brand}>
                <div id="home">
                    <div id="comments">
                        {loading ? <div>loading</div>
                            : comments.map(function (object, i) {
                            return (<div>{object.text}</div>);
                        })}
                    </div>
                </div>
            </DocumentTitle>
        );
    },
    componentDidMount: function () {
        var self = this;
        HackerNews.install(function () {
            HackerNews.GET('comments/8582985', function (err, items) {
                console.log('Got ' + items.length.toString() + ' comments');
                self.setState({
                    comments: items,
                    err: err,
                    isLoading: false
                });
            });
        });
    },
    getInitialState: function () {
        return {
            comments: [],
            err: null,
            isLoading: true
        }
    }
});

module.exports = Home;