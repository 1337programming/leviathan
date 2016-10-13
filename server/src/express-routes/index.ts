/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as express from 'express';
import * as path from 'path';
import { Logger } from '../utils/logger';

let indexRouter: express.Router = express.Router();

indexRouter.get('/', (request: express.Request, response: express.Response) => {
    Logger.log('Serving index page');
    response.sendFile(path.resolve((__dirname + '/../index.html')));
});

export = indexRouter;
