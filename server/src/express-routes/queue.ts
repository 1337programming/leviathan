/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as express from 'express';
import * as email_validator from 'email-validator';

import { Logger } from '../utils/logger';
import { Queue } from '../firebase/queue';
import { QueueItemTemplate } from '../firebase/model/queue-item-template';

let queueRouter: express.Router = express.Router();
let queue = new Queue();

queueRouter.get('/', (request: express.Request, response: express.Response) => {
    queue.getQueue((status, getQueueResponse) => {
        return response.status(status).send(getQueueResponse);
    });
});
queueRouter.get('/position/:userId', (request: express.Request, response: express.Response) => {
    let userId = request.params.userId;
    if (!userId) {
        return response.status(400).send(Logger.logResponse('Error, Bad params for GET user position'));
    }
    queue.getUserPosition(userId, (status, getPositionResponse) => {
        return response.status(status).send(getPositionResponse);
    });
});
queueRouter.delete('/', (request: express.Request, response: express.Response) => {
    queue.getQueue((status, deleteQueueResponse) => {
        return response.status(status).send(deleteQueueResponse);
    });
});

queueRouter.post('/push/:userId', (request: express.Request, response: express.Response) => {
    let userId = request.params.userId;
    let params = request.body;
    if (!params || !userId) {
        return response.status(400).send(Logger.logResponse('Error, Bad params for ADD to QUEUE'));
    }
    let queueItemTemplate = new QueueItemTemplate(params);
    queue.pushUser(userId, queueItemTemplate, (status, pushUserResponse) => {
        return response.status(status).send(pushUserResponse);
    });
});

queueRouter.get('/poll/:user_id', (request: express.Request, response: express.Response) => {
    let user_id = request.params.user_id;
    if (!user_id) {
        return response.status(400).send(Logger.logResponse('Error, Bad params for POLL from QUEUE'));
    }
    queue.pollSpecificUser(user_id, (status, pollSpecificUserResponse) => {
        return response.status(status).send(pollSpecificUserResponse);
    });
});

queueRouter.get('/poll', (request: express.Request, response: express.Response) => {
    queue.pollTopUser((status, pollTopUserResponse) => {
        return response.status(status).send(pollTopUserResponse);
    });
});

export = queueRouter;
