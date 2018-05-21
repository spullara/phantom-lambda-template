const pjs = require('./index.js');

pjs.handler({"url": "https://www.yahoo.com", "xpath": "//img"}, {}, (error, results) => {
    console.log(error);
    console.log(results);
});

