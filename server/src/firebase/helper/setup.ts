/// <reference path='../../../typings/index.d.ts' />

import * as firebase from 'firebase';
import { Logger } from '../../utils/logger';

export class FB {
    private static _fb: firebase.app.App;

    static initFB() {
        if (!this._fb) {
            Logger.log('Initializing firebase');
            this._fb = firebase.initializeApp({
                databaseURL: 'https://arduinonfc-e0df7.firebaseio.com',
                serviceAccount: './src/firebase/helper/service-account-credentials.json'
            });
        } else {
            Logger.log('Firebase already initialized');
        }
        return this._fb;
    }
}
