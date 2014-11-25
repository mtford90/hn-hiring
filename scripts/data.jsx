//var siesta = require('../../rest/src/index')({
//    http: require('../../rest/src/http')
//});

var siesta = require('siesta-orm')({
    http: require('siesta-orm/http')
});

console.log('siesta', siesta);

var HackerNews = new siesta.Collection('HackerNews');
HackerNews.baseURL = 'http://localhost:3000/';
var Comment = HackerNews.mapping('Comment', {
    attributes: [
        'text'
    ]
});

HackerNews.descriptor({
    path: 'comments/.*',
    method: 'GET',
    mapping: Comment
});

module.exports = HackerNews;