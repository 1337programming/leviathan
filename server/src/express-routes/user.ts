/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as express from 'express';
import { Logger } from '../utils/logger';
import { User } from '../firebase/user';
import { UserTemplate, DepositTemplate } from '../firebase/model/user-template';

let userRouter: express.Router = express.Router();
let user = new User();

userRouter.post('/', (request: express.Request, response: express.Response) => {
    let params = request.body;
    if (!params) {
        return response.status(400).send(Logger.logResponse('ERROR, Bad params, for CREATE user'));
    }
    let userTemplate = new UserTemplate(params);
    user.createUser(userTemplate, (status, postUserResponse) => {
        return response.status(status).send(postUserResponse);
    });
});

userRouter.post('/deposit/:user_id', (request: express.Request, response: express.Response) => {
    let params = request.body;
    let user_id = request.params.user_id;
    if (!params || !user_id) {
        return response.status(400).send(Logger.logResponse('ERROR, Bad params, for DEPPSIT funds'));
    }
    let depositTemplate = new DepositTemplate(params);
    user.depositFunds(user_id, depositTemplate, (status, depositFundsResonse) => {
        return response.status(status).send(depositFundsResonse);
    });
});

userRouter.get('/:user_id', (request: express.Request, response: express.Response) => {
    let user_id = request.params.user_id;
    if (!user_id) {
        return response.status(400).send(Logger.logResponse('ERROR, Bad params, for GET user'));
    }
    user.getUser(user_id, (status, getUserResponse) => {
        return response.status(status).send(getUserResponse);
    });
});

userRouter.put('/:user_id', (request: express.Request, response: express.Response) => {
    var params = request.body;
    var user_id = request.params.user_id;
    if (!params || !user_id) {
        return response.status(400).send(Logger.logResponse('ERROR, Bad params, for UPDATE user'));
    }
    let userTemplate = new UserTemplate(params);
    user.updateUser(user_id, userTemplate, (status, updateUserResponse) => {
        return response.status(status).send(updateUserResponse);
    });
});

userRouter.delete('/:user_id', (request: express.Request, response: express.Response) => {
    var user_id = request.params.user_id;
    if (!user_id) {
        return response.status(400).send(Logger.logResponse('ERROR, Bad params, for DELETE user'));
    }
    user.deleteUser(user_id, (status, deleteUserResponse) => {

        // TODO Delete references
        return response.status(status).send(deleteUserResponse);
    });
});

export = userRouter;
