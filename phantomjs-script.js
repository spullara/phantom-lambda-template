const page = require('webpage').create();
const system = require('system');

// Need proper error handling with an error json node
phantom.onError = function (msg, trace) {
    console.log(JSON.stringify({"error": msg}));
    phantom.exit();
};

page.open(system.args[1], function(status) {
    if (status !== 'success') {
        console.log(JSON.stringify({"error": status}));
    } else {
        const text = page.evaluate(function (xpath) {
            // Array of results
            var results = [];
            // Grab the XPath from the resuling page
            var xpathResult = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
            for (var nodes = xpathResult.iterateNext(); nodes; nodes = xpathResult.iterateNext()) {
                results.push(nodes.outerHTML);
            }
            return JSON.stringify({"nodes":results});
        }, system.args[2]);
        console.log(text);
    }
    phantom.exit();
});