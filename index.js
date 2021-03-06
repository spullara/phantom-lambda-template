const AWS = require('aws-sdk');
const phantomjs = require('phantomjs-prebuilt');

exports.handler = function(event, context, callback) {
    console.log("Event: " + JSON.stringify(event));
    if (event.url && event.xpath) {
        const phantom = phantomjs.exec('phantomjs-script.js', event.url, event.xpath);

        let result = "";

        phantom.stdout.on('data', function(buf) {
            result += buf;
        });
        phantom.stderr.on('data', function(buf) {
            console.log('ERROR: %s', String(buf));
        });
        phantom.on('close', function(code) {
            console.log('done', code);
        });

        phantom.on('exit', code => {
            console.log('exit: ' + result);
            callback(null, JSON.parse(result));
        });
    } else {
        callback({"error": "url and xpath must be present"})
    }
};
