/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as express from 'express';
import * as path from 'path';

let indexRouter: express.Router = express.Router();

indexRouter.get('/', (request: express.Request, response: express.Response) => {
    response.sendFile(path.resolve((__dirname + '/../index.html')));
});

export = indexRouter;
