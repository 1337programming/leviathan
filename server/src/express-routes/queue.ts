/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as express from 'express';
import * as email_validator from 'email-validator';

import { Logger } from '../utils/logger';
// import {Queue} from '../firebase/queue';

let queueRouter: express.Router = express.Router();
// let queue = new Queue();

queueRouter.get('/', (request: express.Request, response: express.Response) => {
    // queue.getQueue(function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

queueRouter.delete('/', (request: express.Request, response: express.Response) => {
    // queue.getQueue(function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

queueRouter.post('/push', (request: express.Request, response: express.Response) => {
    let params = request.body;
    if (!params) {
        return response.status(400).send(Logger.logResponse('Error, Bad params for ADD to QUEUE'));
    }
    // queue.pushUser(params, function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

queueRouter.post('/poll/:user_id', (request: express.Request, response: express.Response) => {
    let user_id = request.params.user_id;
    if (!user_id) {
        return response.status(400).send(Logger.logResponse('Error, Bad params for POLL from QUEUE'));
    }
    // queue.removeSpecificUser(user_id, function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

queueRouter.get('/poll', (request: express.Request, response: express.Response) => {
    // queue.removeTopUser(function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

export = queueRouter;
