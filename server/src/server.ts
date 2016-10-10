/// <reference path='../typings/index.d.ts' />

'use strict';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

import {Logger} from './utils/logger';
import {AllowCORS} from './express-middleware/allow-cors';

let app = express();
app.use(bodyParser.json());

// Allow Cross Origin Resource Sharing
let allowCORS = new AllowCORS();
app.use(allowCORS.allowCrossDomainRequests);

const Config = require(path.resolve(__dirname, '../../config.json'));

// Https server credentials
const privateKey = fs.readFileSync(path.resolve(__dirname, './sslcert/server.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, './sslcert/server.crt'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Initialize servers for the app
let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

let logger = new Logger(Config.debug);
httpServer.listen(Config.server_config.http.port, function () {
    logger.log('Http Server is listening on port ' + Config.server_config.http.port);
});

httpsServer.listen(Config.server_config.https.port, function () {
    logger.log('Https Server is listening on port ' + Config.server_config.https.port);
});

// Root path -  serves index.html page
app.get('/', function (request: any, response: any) {
    response.sendFile(__dirname + '/index.html');
});


// //Sockets
// var httpIO = io(httpServer);
// var httpsIO = io(httpsServer);

// httpIO.on('connection', function (socket) {
//     socket.emit('initialize', { 'connected': true });
//     socket.on('error', function (error) {
//         logger.log('Error, Socket error: ' + error);
//     });
//     socket.on('conflict', function (data) {
//         logger.log('Error, Socket data conflict: ' + data);
//     });
//     socket.on('disconnect', function () {
//         logger.log('Socket disconnected');
//     });
// });

// httpsIO.on('connection', function (socket) {
//     socket.emit('initialize', { 'connected': true });
//     socket.on('error', function (error) {
//         logger.log('Error, Socket error: ' + error);
//     });
//     socket.on('conflict', function (data) {
//         logger.log('Error, Socket data conflict: ' + data);
//     });
//     socket.on('disconnect', function () {
//         logger.log('Socket disconnected');
//     });
// });
// // Pass sockets to routes for emitting signal
// app.use(function (request:any, response:any, next:any) {
//     request.httpIO = httpIO;
//     request.httpsIO = httpsIO;
//     next();
// });

// Routers
// let UID = require('./src/routers/uid-router');
// let User = require('./src/routers/user-router');
// let Auth = require('./src/routers/auth-router');
// let Queue = require('./src/routers/queue-router');

// app.use('/user', User);
// app.use('/auth', Auth);
// app.use('/uid', UID);
// app.use('/queue', Queue);
