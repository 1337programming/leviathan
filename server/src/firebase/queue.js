var queue = module.exports = {};
const firebase = require('firebase');
const fb_instance = require('./init/setup');
const logger = require('../util');
const user = require('./user');

var queueRef = fb_instance.db.ref('/queue');

queue.getQueue = function (callback) {
    queueRef.once('value').then(function (snapshot) {
        logger.log('Success, Getting queue');
        callback(200, snapshot.val());
    }).catch(function (error) {
        callback(500, logger.logResponse('Error, Could not get Queue'));
    });
};

queue.emptyQueue = function (callback) {
    queueRef.remove(function (error) {
        if (error) {
            callback(500, logger.logResponse('Error, Remove items from queue: ' + error));
        } else {
            callback(200, logger.logResponse('Success, emptying queue'));
        }
    });
};

queue.pushUser = function (user_id, callback) {
    getItem(user_id, function (status, response) {
        if (response) {
            callback(400, logger.logResponse('Error, User already exists in queue: ' + user_id));
        } else {
            user.getUser(user_id, function (status, data) {
                if (!data) {
                    callback(400, logger.logResponse('Error, User does not exist: ' + user_id));
                } else {
                    var newQueueItem = queueRef.push();
                    data.user_id = user_id;
                    newQueueItem.set(data).then(function () {
                        callback(200, logger.logResponse('Success, Added queue item: ' + newQueueItem.key));
                    }).catch(function (error) {
                        callback(500, logger.logResponse('Error, Adding queue item: ' + error));
                    });
                }
            });
        }
    });
};

queue.removeTopUser = function (callback) {
    getItem(null, function (status, response) {
        if (status !== 200) {
            callback(status, response);
        } else {
            removeItem(response, callback);
        }
    });
};

queue.removeSpecificUser = function (user_id, callback) {
    getItem(user_id, function (status, response) {
        if (status !== 200) {
            callback(status, response);
        } else {
            removeItem(response, callback);
        }
    });
};

function validateQueueTemplate(queue_template, callback) {
    //TODO: validate
    callback(true);
}

function getQueue(callback) {
    queueRef.once('value').then(function (snapshot) {
        logger.log('Success, Getting queue');
        callback(200, snapshot.val());
    }).catch(function (error) {
        callback(500, logger.logResponse('Error, Could not get Queue'));
    });
}

// Function to get top user (if user_id is null) or specific user (if user_id is specified)
function getItem(user_id, callback) {
    var item_ref = (user_id ? queueRef.orderByChild('user_id').equalTo(user_id) : queueRef.orderByKey().limitToFirst(1));
    item_ref.once('value', function (item_snapshot) {
        if (item_snapshot.exists()) {
            item_snapshot.forEach(function (item) {
                user_id ? logger.log('Success, Getting item for user: ' + user_id + ' , item: ' + item.key) : logger.log('Success, Getting top item: ' + item.key);
                callback(200, item.key);
            });
        } else {
            user_id ? logger.log('Success, Getting item (no match): ' + user_id) : logger.log('Success, Getting item (empty queue)');
            callback(200, null);
        }
    });
}

function removeItem(queue_id, callback) {
    if (queue_id) {
        var item_ref = queueRef.child(queue_id);
        item_ref.once('value', function (item_snapshot) {
            if (item_snapshot.exists()) {
                item_ref.remove(function (error) {
                    if (error) callback(500, logger.logResponse('Error, Removing item: ' + error));
                    callback(200, logger.logResponse('Success, user deleted from queue: ' + queue_id));
                });
            } else {
                logger.log('Success, No Match, Retrieving item: ' + queue_id);
                callback(200, null);
            }
        });
    } else {
        logger.log('Success, Removing item queue is empty or user does not exist in queue');
        callback(200, null);
    }
}