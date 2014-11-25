var siesta = require('siesta-orm')({
    http: require('siesta-orm/http')
});

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