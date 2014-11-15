var http = require('http')
, querystring = require('querystring');

// Params as accepted by the Algolia API.
// Algolia is a start-up that powers Hacker News Search API.
// I pulled this stuff by intercepting the network requests in chrome.
var params = {
    query: 'whos hiring',
    hitsPerPage: 25,
    page: 0,
    getRankingInfo: 1,
    minWordSizefor1Typo: 5,
    minWordSizefor2Typos: 9,
    tagFilters:["story"],
    numericFilters:[],
    advancedSyntax: true,
    queryType: 'prefixNone'
};

// POST data
var data = JSON.stringify({
    "params": querystring.stringify(params),
    "apiKey": "8ece23f8eb07cd25d40262a1764599b1",
    "appID": "UJ5WYC0L7X"
});

// HTTP Options
var options = {
    hostname: 'uj5wyc0l7x-dsn.algolia.io',
    path: '/1/indexes/Item_production/query',
    method: 'POST',
    headers: {
        'X-Algolia-API-Key': '8ece23f8eb07cd25d40262a1764599b1',
        'X-Algolia-Application-Id': 'UJ5WYC0L7X',
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

var req = http.request(options, function(res) {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        console.log('data', JSON.parse(data));
    });
});

req.write(data);
req.end();