const pjs = require('./index.js');

pjs.handler({"url": "http://mobile311.sfgov.org/?external=false", "xpath": "//tr[@class=report]"}, {}, (error, results) => {
    console.log(error);
    console.log(results);
});

