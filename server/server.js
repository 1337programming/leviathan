const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const io = require('socket.io');
const http = require('http');
const https = require('https');
const logger = require('./src/util');

var app = express();
app.use(bodyParser.json());


// Https server credentials
var privateKey = fs.readFileSync(path.resolve(__dirname, './sslcert/server.key'), 'utf8');
var certificate = fs.readFileSync(path.resolve(__dirname, './sslcert/server.crt'), 'utf8');
var credentials = { key: privateKey, cert: certificate };

// Initialize servers for the app
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8081, function () {
    logger.log('Http Server is listening on port 8081');
});

httpsServer.listen(8443, function () {
    logger.log('Https Server is listening on port 8443');
});

// Root path -  serves index.html page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Sockets
var httpIO = io(httpServer);
var httpsIO = io(httpsServer);

httpIO.on('connection', function (socket) {
    socket.emit('initialize', { 'connected': true });
    socket.on('error', function (error) {
        logger.log('Error, Socket error: ' + error);
    });
    socket.on('conflict', function (data) {
        logger.log('Error, Socket data conflict: ' + data);
    });
    socket.on('disconnect', function () {
        logger.log('Socket disconnected');
    });
});

httpsIO.on('connection', function (socket) {
    socket.emit('initialize', { 'connected': true });
    socket.on('error', function (error) {
        logger.log('Error, Socket error: ' + error);
    });
    socket.on('conflict', function (data) {
        logger.log('Error, Socket data conflict: ' + data);
    });
    socket.on('disconnect', function () {
        logger.log('Socket disconnected');
    });
});

// Pass sockets to routes for emitting signal
app.use(function (request, response, next) {
    request.httpIO = httpIO;
    request.httpsIO = httpsIO;
    next();
});

// Routers 
const UID = require('./src/routers/uid-router');
const User = require('./src/routers/user-router');
const Auth = require('./src/routers/auth-router');
const Queue = require('./src/routers/queue-router');

app.use('/user', User);
app.use('/auth', Auth);
app.use('/uid', UID);
app.use('/queue', Queue);