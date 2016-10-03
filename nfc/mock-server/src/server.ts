import * as express from 'express';
import * as socketIO from 'socket.io';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import {Authentication} from './authentication/authentication';
import {DefineProxies} from './proxies/proxies';
import {StreamEmitter} from './stream-emitter/stream-emitter';
import {SocketServer} from './socket/socket-server';
import {SerialFeed} from './hardware/serial-feed';
import request = require('request');
import {CoreOptions} from 'request';
import req = require('~express/lib/request');
import {IncomingMessage} from 'http';

declare const require: any;

let app = express();
const http = require('http').Server(app);
const io = socketIO(http);
const CONFIG = require(path.resolve('../../config.json')).nfc.server_config;

// Init Environment Variables
let streamEmitter:StreamEmitter = new StreamEmitter();
let socketServer:SocketServer = new SocketServer(io, streamEmitter);
//let serialFeed:SerialFeed = new SerialFeed(streamEmitter);
let Router = DefineProxies(streamEmitter);
let AuthInstance = new Authentication(CONFIG.port);

// Define Server App
app.use(bodyParser.json()); // JSON Body Parser
app.use(AuthInstance.allowCrossDomain); // Cross Domain rules
app.use('/api', Router); // Set REST API Router

// Serve up index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve('src/public/index.html'));
});
app.get('/homer', (req, res) => {
  res.sendFile(path.resolve('src/public/homer.html'));
});

// Run Scanner
//serialFeed.run();

let uidFeedSubscription = streamEmitter.listen('UID', (uid:string) => {
  let options = {
    method: 'POST',
    json: true,
    url: '',
    body: {
      uid: uid
    }
  };
  request(options, (error:any, response: IncomingMessage, body:any) => {
    if (error) {
      console.log(`${new Date()}: Error: ${error}`);
    } else if (body) {
      console.log(body);
      if (response) {
        console.log(response.statusCode, response.statusMessage);
      }
    }
  });
});

http.listen(CONFIG.port, () => {
  console.log(`${new Date()}: Listening on port ${CONFIG.port}`);
});
