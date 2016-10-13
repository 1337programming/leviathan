import {StreamEmitter} from './stream-emitter/stream-emitter';
import {SerialFeed} from './hardware/serial-feed';
import request = require('request');
import {CoreOptions} from 'request';
import req = require('~express/lib/request');
import {IncomingMessage} from 'http';

// Init Environment Variables
let streamEmitter:StreamEmitter = new StreamEmitter();
//let serialFeed:SerialFeed = new SerialFeed(streamEmitter);

// Define Server App

let uidFeedSubscription = streamEmitter.listen('UID', (uid:string) => {
  let options:CoreOptions = {
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
