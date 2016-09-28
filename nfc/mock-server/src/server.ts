import * as express from 'express';
import * as io from 'socket.io';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import {Authentication} from './authentication/authentication';
import {DefineProxies} from './proxies/proxies';
import {StreamEmitter} from './stream-emitter/stream-emitter';

declare const require: any;

const Config = require(path.resolve('../../config.json'));

// Init Environment

let streamEmitter:StreamEmitter = new StreamEmitter();
let Router = DefineProxies(streamEmitter);
let AuthInstance = new Authentication(Config.nfc.server_config.port);
let app = express();
app.use(bodyParser.json());
app.use(AuthInstance.allowCrossDomain);

