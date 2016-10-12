/// <reference path='../../typings/index.d.ts' />

import * as firebase from 'firebase';


import { FB } from './helper/setup';
import { AuthToken } from './helper/auth-token';
import { Logger } from '../utils/logger';
import { AccountTemplate } from './model/account-template';
import { User } from '../firebase/user';
import { UserTemplate } from './model/user-template';


export class Account {
    private _logger: Logger;
    private _fb_instance: firebase.app.App;
    private _account_ref: firebase.database.Reference;
    private user: User;

    constructor() {
        this._logger = new Logger();
        this._fb_instance = FB.initFB();
        this._account_ref = this._fb_instance.database().ref('/account');
        this.user = new User();
    }


    login(email: string, password: string, callback: (status: number, response: any) => void) {
        this.findAccount(email, (accountId) => {
            if (!accountId) {
                callback(404, Logger.logResponse('ERROR: Account not found for email: ' + email));
            } else {
                let singleAccountRef = this._account_ref.child(accountId);
                singleAccountRef.once('value', (snapshot: firebase.database.DataSnapshot) => {
                    if (snapshot.exists()) {
                        // TODO input response into template and validate password exists 
                        if (password !== snapshot.val().password) {
                            callback(403, Logger.logResponse('ERROR, Incorrect Password for email: ' + email));
                        } else {
                            let token = new AuthToken(snapshot.val().user_id);
                            Logger.log('Success, Authenticating user with email: ' + email);
                            callback(200, token);
                        }
                    } else {
                        callback(500, Logger.logResponse('ERROR, Retrieving account for: ' + accountId));
                    }
                });
            }
        });
    }

    register(accountTemplate: AccountTemplate, callback: (status: number, response: any) => void) {
        if (!accountTemplate.valid()) {
            callback(400, Logger.logResponse('ERROR: Invalid Account Template'));
        } else {
            this.findAccount(accountTemplate.getData().email, (accountId) => {
                if (!accountId) {
                    let userTemplate = new UserTemplate(accountTemplate);
                    this.user.createUser(userTemplate.getData(), (status, createUserResponse) => {
                        if (status !== 200) {
                            callback(status, Logger.logResponse('Error, Could not Create user'));
                        } else {
                            let newAccount: firebase.database.ThenableReference = this._account_ref.push();
                            let newAccountTemplate = new AccountTemplate({
                                email: accountTemplate.getData().email,
                                password: accountTemplate.getData().password,
                                user_id: createUserResponse
                            });
                            newAccount.set(newAccountTemplate.getData()).then(() => {
                                callback(200, Logger.logResponse('Success, Account created: ' + newAccount.key));
                            }).catch((error) => {
                                callback(500, Logger.logResponse('Error, Adding account : ' + error));
                            });
                        }
                    });
                } else {
                    callback(400, Logger.logResponse('ERROR: Account already exists for email: ' + accountTemplate.getData().email));
                }
            });
        }
    }


    deleteAccount(accountId: string, callback: (status: number, response: any) => void) {
        let childAccountRef = this._account_ref.child(accountId);
        childAccountRef.once('value', function (snapshot: firebase.database.DataSnapshot) {
            if (snapshot.exists()) {
                childAccountRef.remove().then(function () {
                    callback(200, Logger.logResponse('SUCCESS: Delete account: ' + accountId));
                }).catch(function (error) {
                    callback(500, Logger.logResponse('ERROR, Delete account: ' + error));
                });
            } else {
                Logger.log('SUCCESS: Delete user, no match: ' + accountId);
                callback(200, null);
            }
        });
    }

    private findAccount(email: string, callback: (accountId: string) => void) {
        let singleAccountRef = this._account_ref.orderByChild('email').equalTo(email);
        singleAccountRef.once('value', (snapshot: firebase.database.DataSnapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((item) => {
                    Logger.log('Account found account for email: ' + email);
                    callback(item.key);
                    return true; // Cancels further enumeration
                });
            } else {
                Logger.log('Account DNE for email: ' + email);
                callback(null);
            }
        });
    }
}
