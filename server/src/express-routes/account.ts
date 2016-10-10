/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as express from 'express';
import * as email_validator from 'email-validator';

import { Logger } from '../utils/logger';
// import {Account} from '../firebase/account';

let accountRouter: express.Router = express.Router();
let logger = new Logger();
// let account = new Account();

accountRouter.post('/login', (request: express.Request, response: express.Response) => {
    let params = request.body;
    if (!params) {
        return response.status(400).send(logger.logResponse('Error, Bad params, for LOGIN'));
    } else if (!email_validator.validate(params.email)) {
        return response.status(400).send(logger.logResponse('Error, Bad request, invalid email'));
    }
    // account.login(params.email, params.password, function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

accountRouter.post('/register', (request: express.Request, response: express.Response) => {
    let params = request.body;
    if (!params) {
        return response.status(400).send(logger.logResponse('Error, Bad params, for REGISTER'));
    } else if (!email_validator.validate(params.email)) {
        return response.status(400).send(logger.logResponse('Error, Bad request, invalid email'));
    }
    // account.register(params, function (status, response) {
    //     return res.status(status).send(response);
    // });
    return response.status(200).send('Did not do anything');
});

export = accountRouter;
