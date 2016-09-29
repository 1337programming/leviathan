var Util = module.exports = {};
var config = require('../config.json');

Util.log = function (msg) {
    log(msg);
}

Util.logResponse = function (msg) {
    log(msg);
    return (new Date() + ' ' + msg);
}

function log(msg) {
    if (config.debug_mode) {
        console.log((new Date()), msg);
    }
}