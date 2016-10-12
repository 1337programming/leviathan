/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as express from 'express';
import * as email_validator from 'email-validator';

import { Logger } from '../utils/logger';
import { Account } from '../firebase/account';
import { AccountTemplate } from '../firebase/model/account-template';


let accountRouter: express.Router = express.Router();
let account = new Account();

accountRouter.post('/login', (request: express.Request, response: express.Response) => {
    let params = request.body;
    if (!params) {
        return response.status(400).send(Logger.logResponse('Error, Bad params, for LOGIN'));
    } else if (!email_validator.validate(params.email)) {
        return response.status(400).send(Logger.logResponse('Error, Bad request, invalid email'));
    }
    account.login(params.email, params.password, (status, loginResponse) => {
        return response.status(status).send(loginResponse);
    });
});

accountRouter.post('/register', (request: express.Request, response: express.Response) => {
    let params = request.body;
    if (!params) {
        return response.status(400).send(Logger.logResponse('Error, Bad params, for REGISTER'));
    } else if (!email_validator.validate(params.email)) {
        return response.status(400).send(Logger.logResponse('Error, Bad request, invalid email'));
    }
    let accountTemplate = new AccountTemplate(params);
    account.register(accountTemplate, (status, registerResponse) => {
        return response.status(status).send(registerResponse);
    });
});

export = accountRouter;
