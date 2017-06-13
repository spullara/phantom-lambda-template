
var AWS = require('aws-sdk');
var phantomjs = require('phantomjs-prebuilt');

exports.handler = function(event, context, callback) {
    console.log("Event: " + event);

    var phantom = phantomjs.exec('phantomjs-script.js', event.url);

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
        callback(null, 'fin!!');
    });

};