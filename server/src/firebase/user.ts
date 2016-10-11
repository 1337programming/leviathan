/// <reference path='../../typings/index.d.ts' />

import * as firebase from 'firebase';
import { FB } from './helper/setup';
import { Logger } from '../utils/logger';
import { UserTemplate } from './model/user-template';

export class User {
    private _logger: Logger;
    private _fb_instance: firebase.app.App;
    private _user_ref: firebase.database.Reference;

    constructor() {
        this._logger = new Logger();
        this._fb_instance = FB.initFB();

        this._user_ref = this._fb_instance.database().ref('/user');
    }

    createUser(userTemplate: UserTemplate, callback: (status: number, response: any) => void) {
        if (!userTemplate.valid()) {
            Logger.log('ERROR: Invalid User Template');
            callback(400, null);
        } else {
            let newUser: firebase.database.ThenableReference = this._user_ref.push();
            newUser.set(userTemplate.getData()).then(function () {
                Logger.log('SUCCESS, User created: ' + newUser.key);
                callback(200, newUser.key);
            }).catch(function (error) {
                Logger.log('ERROR, Adding user : ' + error);
                callback(500, null);
            });
        }
    }

    getUser(userId: string, callback: (status: number, response: any) => void) {
        let childUserRef = this._user_ref.child(userId);
        childUserRef.once('value', function (snapshot: firebase.database.DataSnapshot) {
            if (snapshot.exists()) {
                Logger.log('SUCCESS: Get user: ' + userId);
                callback(200, snapshot.val());
            } else {
                Logger.log('SUCCESS: Get user, no match: ' + userId);
                callback(200, null);
            }
        });
    }

    updateUser(userId: string, userTemplate: UserTemplate, callback: (status: number, response: any) => void) {
        if (!userTemplate.valid()) {
            Logger.log('ERROR: Invalid User Template');
            callback(400, null);
        } else {
            let childUserRef = this._user_ref.child(userId);
            childUserRef.once('value', function (snapshot: firebase.database.DataSnapshot) {
                if (snapshot.exists()) {
                    childUserRef.update(userTemplate.getData()).then(function () {
                        callback(200, Logger.logResponse('SUCCESS: Update user: ' + userId));
                    }).catch(function (error) {
                        callback(500, Logger.logResponse('ERROR, Update user: ' + error));
                    });
                } else {
                    Logger.log('SUCCESS: Update user, no match: ' + userId);
                    callback(200, null);
                }
            });
        }
    }

    deleteUser(userId: string, callback: (status: number, response: any) => void) {
        let childUserRef = this._user_ref.child(userId);
        childUserRef.once('value', function (snapshot: firebase.database.DataSnapshot) {
            if (snapshot.exists()) {
                childUserRef.remove().then(function () {
                    callback(200, Logger.logResponse('SUCCESS: Delete user: ' + userId));
                }).catch(function (error) {
                    callback(500, Logger.logResponse('ERROR, Delete user: ' + error));
                });
            } else {
                Logger.log('SUCCESS: Delete user, no match: ' + userId);
                callback(200, null);
            }
        });
    }
}
