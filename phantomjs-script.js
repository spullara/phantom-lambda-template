const page = require('webpage').create();
const system = require('system');

page.open(system.args[1], function(status) {
    if (status !== 'success') {
        console.log('Unable to access network');
    } else {
        page.evaluate(function () {
            const nodes = document.evaluate(system.args[2], document, null, XPathResult.ANY_TYPE, null);
            let results = nodes.iterateNext();
            let text = "";
            while (results) {
                text += results.textContent + "\n";
                results = nodes.iterateNext();
            }
            console.log(text);
        });
    }
    phantom.exit();
});