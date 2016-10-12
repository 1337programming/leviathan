/// <reference path='../../typings/index.d.ts' />

import * as firebase from 'firebase';
import * as moment from 'moment';
import { FB } from './helper/setup';
import { Logger } from '../utils/logger';
import { QueueItemTemplate } from './model/queue-item-template';
import { UserTemplate } from './model/user-template';
import { User } from './user';

export class Queue {
    private _logger: Logger;
    private _fb_instance: firebase.app.App;
    private _queue_ref: firebase.database.Reference;
    private user: User;

    constructor() {
        this._logger = new Logger();
        this._fb_instance = FB.initFB();
        this._queue_ref = this._fb_instance.database().ref('/queue');
        this.user = new User();
    }

    // TODO re-implement to be reactive
    getQueue(callback: (status: number, response: any) => void) {
        let fullQueueRef = this._queue_ref;
        fullQueueRef.once('value', function (snapshot: firebase.database.DataSnapshot) {
            if (snapshot.exists()) {
                Logger.log('SUCCESS: Get queue');
                callback(200, snapshot.val());
            } else {
                callback(500, Logger.logResponse('ERROR: Get Queue'));
            }
        });
    }

    emptyQueue(callback: (status: number, response: any) => void) {
        let fullQueueRef = this._queue_ref;
        fullQueueRef.remove(function (error) {
            if (error) {
                callback(500, Logger.logResponse('ERROR: Delete queue: ' + error));
            } else {
                callback(200, Logger.logResponse('SUCCESS: Delete queue'));
            }
        });
    }

    pushUser(userId: string, queueItemTemplate: QueueItemTemplate, callback: (status: number, response: any) => void) {
        if (!queueItemTemplate.valid()) {
            callback(400, Logger.logResponse('ERROR: Invalid Queue template'));
        } else {
            this.user.getUser(userId, (status, response) => {
                if (status === 200 && response !== null) {
                    this.findQueueItem(userId, (queueId: string) => {
                        if (!queueId) {
                            let newQueueItem: firebase.database.ThenableReference = this._queue_ref.push();
                            let newQueueItemTemplate = new QueueItemTemplate({
                                user_id: userId,
                                reason: queueItemTemplate.getData().reason,
                                flow: queueItemTemplate.getData().flow,
                                time: moment().format('MMMM Do YYYY, h:mm:ss a')
                            });
                            newQueueItem.set(newQueueItemTemplate.getData()).then(() => {
                                callback(200, Logger.logResponse('SUCCESS, User added to queue: ' + newQueueItem.key));
                            }).catch((error) => {
                                callback(500, Logger.logResponse('ERROR, Adding user to queue : ' + error));
                            });
                        } else {
                            callback(200, Logger.logResponse('SUCCESS: User already in queue for user id: ' + userId));
                        }
                    });
                } else {
                    callback(400, Logger.logResponse('ERROR: Invalid User id: ' + userId));
                }
            });
        }
    }

    pollTopUser(callback: (status: number, response: any) => void) {
        let queueItemRef = this._queue_ref.orderByKey().limitToFirst(1);
        queueItemRef.once('value', (snapshot: firebase.database.DataSnapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((item: firebase.database.DataSnapshot) => {
                    let specificQueueItemRef = this._queue_ref.child(item.key);
                    specificQueueItemRef.once('value', (specificItemSnapshot: firebase.database.DataSnapshot) => {
                        if (specificItemSnapshot.exists()) {
                            specificQueueItemRef.remove((error) => {
                                if (error) {
                                    callback(500, Logger.logResponse('ERROR: Remove queue item: ' + error));
                                } else {
                                    callback(200, Logger.logResponse('SUCCESS: Remove user from queue: ' + item.key));
                                }
                            });
                        } else {
                            callback(200, Logger.logResponse('ERROR: Queue item does not exist for deletion: ' + item.key));
                        }
                    });
                    return true; // Cancels further enumeration
                });
            } else {
                Logger.log('SUCCESS: Removing top user (Empty queue)');
                callback(200, null);
            }
        });
    }

    pollSpecificUser(userId: string, callback: (status: number, response: any) => void) {
        this.findQueueItem(userId, (queueId: string) => {
            if (!queueId) {
                Logger.log('SUCCESS: User does not exist in queue: ' + userId);
                callback(200, null);
            } else {
                let specificQueueItemRef = this._queue_ref.child(queueId);
                specificQueueItemRef.once('value', (specificQueueItemSnapshot: firebase.database.DataSnapshot) => {
                    if (specificQueueItemSnapshot.exists()) {
                        specificQueueItemRef.remove((error) => {
                            if (error) {
                                callback(500, Logger.logResponse('Error, Removing item: ' + error));
                            } else {
                                callback(200, Logger.logResponse('Success, User removed from queue: ' + queueId));
                            }
                        });
                    } else {
                        callback(200, Logger.logResponse('ERROR: Queue item does not exist for deletion: ' + queueId));
                    }
                });
            }
        });
    }

    private findQueueItem(userId: string, callback: (queueId: string) => void) {
        var queueItemRef = this._queue_ref.orderByChild('user_id').equalTo(userId);
        queueItemRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((item) => {
                    Logger.log('SUCCESS: Get queue item for user id: ' + userId);
                    callback(item.key);
                    return true; // Cancels further enumeration
                });
            } else {
                Logger.log('SUCCESS: Get queue item (no match) for user id: ' + userId);
                callback(null);
            }
        });
    }
}
