
var AWS = require('aws-sdk');
var phantomjs = require('phantomjs-prebuilt');

exports.handler = function(event, context, callback) {
    console.log("Event: " + JSON.stringify(event));
    if (event.url && event.xpath) {
        var phantom = phantomjs.exec('phantomjs-script.js', event.url, event.xpath);

        var result = "";

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
            callback(null, result);
        });
    } else {
        callback(JSON.stringify({"error": "url and xpath must be present"}))
    }
};