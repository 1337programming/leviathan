/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as express from 'express';
import { Logger } from '../utils/logger';
import { Mapping } from '../firebase/mapping';
import { MappingTemplate } from '../firebase/model/mapping-template';


let mappingRouter: express.Router = express.Router();
let mapping = new Mapping();

mappingRouter.post('/:userId/:phoneId', (request: express.Request, response: express.Response) => {
    let phoneId = request.params.phoneId;
    let userId = request.params.userId;
    let params = request.body;
    if (!phoneId || !userId) {
        return response.status(400).send(Logger.logResponse('Error, Bad params for CREATE mapping'));
    }
    let mappingTemplate = new MappingTemplate(params);
    mapping.addMapping(userId, phoneId, mappingTemplate, (status, addMappingResponse) => {
        return response.status(status).send(addMappingResponse);
    });
});

mappingRouter.get('/user/:phoneId', (request: express.Request, response: express.Response) => {
    var phoneId = request.params.phoneId;
    if (!phoneId) {
        return response.status(400).send(Logger.logResponse('ERROR: Bad params for GET mapping for phone'));
    }
    mapping.findMappingUser(phoneId, (status, findMappingUserResponse) => {
        response.status(status).send(findMappingUserResponse);
    });
});

mappingRouter.get('/phone/:userId', (request: express.Request, response: express.Response) => {
    var userId = request.params.userId;
    if (!userId) {
        return response.status(400).send(Logger.logResponse('ERROR: Bad params for GET mapping for user'));
    }
    mapping.findMappingPhone(userId, (status, findMappingPhoneResponse) => {
        response.status(status).send(findMappingPhoneResponse);
    });
});

mappingRouter.delete('/user/:user_id', (request: express.Request, response: express.Response) => {
    let user_id = request.params.user_id;
    if (!user_id) {
        return response.status(400).send(Logger.logResponse('Error, Bad params, for DELETE mapping - user'));
    }
    mapping.deleteMappingUser(user_id, (status, deleteMappingUserResponse) => {
        return response.status(status).send(deleteMappingUserResponse);
    });
});

mappingRouter.delete('/phone/:phone_id', (request: express.Request, response: express.Response) => {
    let phone_id = request.params.phone_id;
    if (!phone_id) {
        return response.status(400).send(Logger.logResponse('Error, Bad params, for DELETE mapping - phone'));
    }
    mapping.deleteMappingPhone(phone_id, (status, deleteMappingPhoneResponse) => {
        return response.status(status).send(deleteMappingPhoneResponse);
    });
});

export = mappingRouter;
