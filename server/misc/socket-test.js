var io = require('socket.io-client');
var socket = io.connect('http://localhost:8081/', {
    'reconnection delay': 0
    , 'reopen delay': 0
    , 'force new connection': true
});

testFunction();

function testFunction() {
    socket.on('connect', function () {
        console.log('Connected via client');
    });
    socket.on('user_scanned', function (data) {
        console.log('User Added: ' + JSON.stringify(data));
    });
}


// ---- Stopping Socket on exit ----
function exitHandler(options, err) {
    socket.disconnect();
    console.log('Goodbye!');
}

// on exit
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
