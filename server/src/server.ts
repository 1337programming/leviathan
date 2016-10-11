/// <reference path='../typings/index.d.ts' />

'use strict';

// Core modules
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

// Utility classes and middleware
import { Logger } from './utils/logger';
import { AllowCORS } from './express-middleware/allow-cors';

// Routes
import * as indexRoutes from './express-routes/index';
import * as userRoutes from './express-routes/user';
import * as accountRoutes from './express-routes/account';
import * as queueRoutes from './express-routes/queue';
import * as phoneRoutes from './express-routes/phone';

class Server {

    public app: express.Application;

    // Starts new express server
    public static bootstrap(): Server {
        return new Server();
    }
    // Configures the server and registers routes 
    constructor() {
        this.app = express();

        // Config the express Server
        this.config();

        // Register routes
        this.routes();
    }

    // Express server config and start listeners
    private config() {
        this.app.use(bodyParser.json());

        // Allow Cross Origin Resource Sharing
        let allowCORS = new AllowCORS();
        this.app.use(allowCORS.allowCrossDomainRequests);

        // Configurations from the root location
        const Config = require(path.resolve(__dirname, '../../config.json'));

        // Https server credentials
        const privateKey = fs.readFileSync(path.resolve(__dirname, './sslcert/server.key'), 'utf8');
        const certificate = fs.readFileSync(path.resolve(__dirname, './sslcert/server.crt'), 'utf8');
        const credentials = { key: privateKey, cert: certificate };

        // Initialize servers for the app
        let httpServer = http.createServer(this.app);
        let httpsServer = https.createServer(credentials, this.app);

        // Listed on http and https port
        let logger = new Logger(Config.debug);
        httpServer.listen(Config.server_config.http.port, function () {
            logger.log('Http Server is listening on port ' + Config.server_config.http.port);
        });

        httpsServer.listen(Config.server_config.https.port, function () {
            logger.log('Https Server is listening on port ' + Config.server_config.https.port);
        });
    }

    // Register routes for the server
    private routes() {
        this.app.use('/', indexRoutes);
        this.app.use('/user', userRoutes);
        this.app.use('/account', accountRoutes);
        this.app.use('/queue', queueRoutes);
        this.app.use('/phone', phoneRoutes);
    }

}

let server = Server.bootstrap();
export = server.app;

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
