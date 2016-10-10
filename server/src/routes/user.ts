/// <reference path='../../typings/index.d.ts' />

'use strict';

import * as express from 'express';
import * as path from 'path';

module Route {

    export class User {
        public base(request: express.Request, response: express.Response, next: express.NextFunction) {
            response.sendFile(path.resolve((__dirname + '/../index.html')));
        }
    }
}

export = Route;
