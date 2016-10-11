/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as express from 'express';
import { Logger } from '../utils/logger';
// import {Phone} from '../firebase/phone';

let phoneRouter: express.Router = express.Router();
// let phone = new Phone();

phoneRouter.post('/:user_id/:phone_id', (request: express.Request, response: express.Response) => {
    var phone_id = request.params.phone_id;
    var user_id = request.params.user_id;
    if (!phone_id || !user_id) {
        return response.status(400).send(Logger.logResponse('Error, Bad params for CREATE PHONE mapping'));
    }
    // phone.createMapping(user_id, phone_id, params, function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

phoneRouter.delete('user/:user_id', (request: express.Request, response: express.Response) => {
    let user_id = request.params.user_id;
    if (!user_id) {
        return response.status(400).send(Logger.logResponse('Error, Bad params, for DELETE USER mapping'));
    }
    // phone.deleteUserMapping(user_id, null, function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

phoneRouter.delete('phone/:phone_id', (request: express.Request, response: express.Response) => {
    let phone_id = request.params.phone_id;
    if (!phone_id) {
        return response.status(400).send(Logger.logResponse('Error, Bad params, for DELETE PHONE mapping'));
    }
    // phone.deletePhoneMapping(null, phone_id, function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

phoneRouter.get('/phone/:user_id', (request: express.Request, response: express.Response) => {
    var user_id = request.params.user_id;
    if (!user_id) {
        return response.status(400).send(Logger.logResponse('Error, Bad params, for GET phone from USER'));
    }
    // phone.getPhoneId(user_id, function (status, response) {
    //     if (status !== 200) {
    //         return res.status(status).send(null);
    //     } else {
    //         var data = {};
    //         data.user_id = response;
    //         httpIO.emit('user_scanned', data);
    //         httpsIO.emit('user_scanned', data);
    //         return res.status(200).send(logger.logResponse('Success finding mapping for uid: ' 
    //                                                          + uid + ' , found user_id: ' + data.user_id));
    //     }
    // });
    return response.status(200).send('Did not do anything');
});

phoneRouter.get('/user/:phone_id', (request: express.Request, response: express.Response) => {
    var phone_id = request.params.phone_id;
    if (!phone_id) {
        return response.status(400).send(Logger.logResponse('Error, Bad params, for GET user for PHONE'));
    }
    // phone.getUserId(uid, function (status, response) {
    //     if (status !== 200) {
    //         return res.status(status).send(null);
    //     } else {
    //         var data = {};
    //         data.user_id = response;
    //         httpIO.emit('user_scanned', data);
    //         httpsIO.emit('user_scanned', data);
    //         return res.status(200).send(logger.logResponse('Success finding mapping for uid: ' 
    //                                                        + uid + ' , found user_id: ' + data.user_id));
    //     }
    // });
    return response.status(200).send('Did not do anything');
});

export = phoneRouter;
