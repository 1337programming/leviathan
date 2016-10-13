/// <reference path='../../typings/index.d.ts' />

import * as firebase from 'firebase';


import { FB } from './helper/setup';
import { AuthToken } from './helper/auth-token';
import { Logger } from '../utils/logger';
import { MappingTemplate } from './model/mapping-template';
import { User } from '../firebase/user';
import { UserTemplate } from './model/user-template';


export class Mapping {
    private _logger: Logger;
    private _fb_instance: firebase.app.App;
    private _mapping_ref: firebase.database.Reference;
    private user: User;

    constructor() {
        this._logger = new Logger();
        this._fb_instance = FB.initFB();
        this._mapping_ref = this._fb_instance.database().ref('/mapping');
        this.user = new User();
    }


    addMapping(userId: string, phoneId: string, mappingTemplate: MappingTemplate, callback: (status: number, response: any) => void) {
        if (!mappingTemplate.valid()) {
            callback(400, Logger.logResponse('ERROR: Invalid mapping Template'));
        } else {
            this.user.getUser(userId, (status, response) => {
                if (status === 200 && response !== null) {
                    this.findMapping(null, phoneId, (mappingId: string) => {
                        if (!mappingId) {
                            let newMappingRef: firebase.database.ThenableReference = this._mapping_ref.push();
                            let newMappingTemplate = new MappingTemplate({
                                user_id: userId,
                                phone_id: phoneId,
                                data: mappingTemplate.getData()
                            });
                            newMappingRef.set(newMappingTemplate.getData()).then(() => {
                                callback(200, Logger.logResponse('SUCCESS: Mapping added: ' + newMappingRef.key));
                            }).catch((error) => {
                                callback(500, Logger.logResponse('ERROR: Could not add mapping: ' + error));
                            });
                        } else {
                            callback(200, Logger.logResponse('SUCCESS: Mapping already exists for phone id: ' + phoneId));
                        }
                    });
                } else {
                    callback(400, Logger.logResponse('ERROR: Invalid User id: ' + userId));
                }
            });

        }
    }

    findMappingUser(phoneId: string, callback: (status: number, response: any) => void) {
        this.findMapping(null, phoneId, (mappingId: string) => {
            if (!mappingId) {
                callback(404, Logger.logResponse('ERROR: User not found for phone id: ' + phoneId));
            } else {
                let singleMappingRef = this._mapping_ref.child(mappingId);
                singleMappingRef.once('value', (snapshot) => {
                    if (snapshot.exists()) {
                        let userId = snapshot.val().user_id;
                        if (!userId) {
                            callback(500, Logger.logResponse('ERROR: Invalid mapping object userId DNE for mapping: ' + mappingId));
                        } else {
                            Logger.log('SUCCESS: Found userId for phoneId: ' + phoneId);
                            callback(200, userId);
                        }
                    } else {
                        callback(500, Logger.logResponse('ERROR: Mapping not found for mapping id: ' + mappingId));
                    }
                });
            }
        });
    }

    findMappingPhone(userId: string, callback: (status: number, response: any) => void) {
        this.findMapping(userId, null, (mappingId: string) => {
            if (!mappingId) {
                callback(404, Logger.logResponse('ERROR: Phone not found for user id: ' + userId));
            } else {
                let singleMappingRef = this._mapping_ref.child(mappingId);
                singleMappingRef.once('value', (snapshot) => {
                    if (snapshot.exists()) {
                        let phoneId = snapshot.val().phone_id;
                        if (!phoneId) {
                            callback(500, Logger.logResponse('ERROR: Invalid mapping object phoneId DNE for mapping: ' + mappingId));
                        } else {
                            Logger.log('SUCCESS: Found phoneId for userId: ' + userId);
                            callback(200, phoneId);
                        }
                    } else {
                        callback(500, Logger.logResponse('ERROR: Mapping not found for mapping id: ' + mappingId));
                    }
                });
            }
        });
    }

    deleteMappingUser(userId: string, callback: (status: number, response: any) => void) {
        this.findMapping(userId, null, (mappingId: string) => {
            if (!mappingId) {
                callback(200, Logger.logResponse('SUCCESS: Delete mapping (DNE) for user id: ' + userId));
            } else {
                let singleMappingRef = this._mapping_ref.child(mappingId);
                singleMappingRef.once('value', (snapshot) => {
                    if (snapshot.exists()) {
                        singleMappingRef.remove().then(() =>  {
                            callback(200, Logger.logResponse('SUCCESS: Delete account for user id: ' + userId));
                        }).catch((error) => {
                            callback(500, Logger.logResponse('ERROR, Delete account for user id: ' + error));
                        });
                    } else {
                        Logger.log('SUCCESS: Delete user, no match for user id: ' + userId);
                        callback(200, null);
                    }
                });
            }
        });
    }

    deleteMappingPhone(phoneId: string, callback: (status: number, response: any) => void) {
        this.findMapping(null, phoneId, (mappingId: string) => {
            if (!mappingId) {
                callback(200, Logger.logResponse('SUCCESS: Delete mapping (DNE) for phone id: ' + phoneId));
            } else {
                let singleMappingRef = this._mapping_ref.child(mappingId);
                singleMappingRef.once('value', (snapshot) => {
                    if (snapshot.exists()) {
                        singleMappingRef.remove().then(() => {
                            callback(200, Logger.logResponse('SUCCESS: Delete mapping for phone id: ' + phoneId));
                        }).catch((error) => {
                            callback(500, Logger.logResponse('ERROR, Delete mapping for phone id: ' + error));
                        });
                    } else {
                        Logger.log('SUCCESS: Delete user, no match for phone id: ' + phoneId);
                        callback(200, null);
                    }
                });
            }
        });
    }

    private findMapping(userId: string, phoneId: string, callback: (number: string) => void) {
        let singleMappingRef = (userId ? this._mapping_ref.orderByChild('user_id').equalTo(userId)
            : this._mapping_ref.orderByChild('phone_id').equalTo(phoneId));
        singleMappingRef.once('value', (snapshot: firebase.database.DataSnapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((item) => {
                    (userId ? Logger.log('Mapping found for userId: ' + userId) : Logger.log('Mapping found for phoneId: ' + phoneId));
                    callback(item.key);
                    return true; // Cancels further enumeration
                });
            } else {
                (userId ? Logger.log('Mapping DNE for userId: ' + userId) : Logger.log('Mapping DNE for phoneId: ' + phoneId));
                callback(null);
            }
        });

    }
}
