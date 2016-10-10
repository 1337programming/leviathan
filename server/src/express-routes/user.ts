/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as express from 'express';
import { Logger } from '../utils/logger';
// import {User} from '../firebase/user';

let userRouter: express.Router = express.Router();
let logger:Logger= new Logger();
// let user = new User();

userRouter.post('/', (request: express.Request, response: express.Response) => {
    let params = request.body;
    if (!params) {
        return response.status(400).send(logger.logResponse('Error, Bad params, for CREATE user'));
    }
    // user.createUser(params, function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

userRouter.get('/:user_id', (request: express.Request, response: express.Response) => {
    let user_id = request.params.user_id;
    if (!user_id) {
        return response.status(400).send(logger.logResponse('Error, Bad params, for GET user'));
    }
    // user.getUser(user_id, function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

userRouter.put('/:user_id', (request: express.Request, response: express.Response) => {
    var params = request.body;
    var user_id = request.params.user_id;
    if (!params || !user_id) {
        return response.status(400).send(logger.logResponse('Error, Bad params, for UPDATE user'));
    }
    // user.updateUser(user_id, params, function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

userRouter.delete('/:user_id', (request: express.Request, response: express.Response) => {
    var user_id = request.params.user_id;
    if (!user_id) {
        return response.status(400).send(logger.logResponse('Error, Bad params, for DELETE user'));
    }
    // user.deleteUser(user_id, function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

export = userRouter;
