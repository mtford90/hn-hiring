var express = require('express')
    , app = express()
    , conf = require('./dev.config')
    , hn = require('./node_scripts/hnsearch');

// Return root comments for thread with id=id
app.get('/comments/:id', function (req, res) {
    console.log(1);
    hn.getRootComments(req.param('id'), function (err, comments) {
        if (err) {
            res.json({err: err}, 500);
        }
        else {
            res.json(comments);
        }
    });
});

app.use(express.static(conf.compilation.dir + '/public'));



module.exports = app;

