var user = module.exports = {};
const firebase = require('firebase');
const fb_instance = require('./init/setup');
const logger = require('../util');
const path = require('path');

var userRef = fb_instance.db.ref('/user');

user.createUser = function (user_template, callback) {
    validateUserTemplate(user_template, function (valid) {
        if (!valid) {
            logger.log('Error, Invalid User template');
            callback(400, null);
        } else {
            var newUser = userRef.push();
            newUser.set(user_template).then(function () {
                logger.log('Success, User created: ' + newUser.key);
                callback(200, newUser.key);
            }).catch(function (error) {
                logger.log('Error, Adding user : ' + error);
                callback(500, null);
            });
        }
    });
};

user.getUser = function (user_id, callback) {
    getUser(user_id, function (user_snapshot) {
        if (user_snapshot) {
            logger.log('Success, Retrieving user: ' + user_id);
            callback(200, user_snapshot);
        } else {
            logger.log('No Match, Retrieving user: ' + user_id);
            callback(200, null);
        }
    });
};

user.updateUser = function (user_id, user_template, callback) {
    validateUserTemplate(user_template, function (valid) {
        if (!valid) callback(400, logger.logResponse('Error, Invalid User Template'));
        getUser(user_id, function (user_snapshot) {
            if (!user_snapshot) {
                logger.log('No Match, Retrieving user: ' + user_id);
                callback(200, null);
            } else {
                var user_ref = userRef.child(user_id);
                user_ref.update(user_template).then(function () {
                    callback(200, logger.logResponse('Success, User updated: ' + user_id));
                }).catch(function (error) {
                    callback(500, logger.logResponse('Error, User update: ' + error));
                });
            }
        });
    });
};

user.deleteUser = function (user_id, callback) {
    getUser(user_id, function (user_snapshot) {
        if (!user_snapshot) {
            logger.log('No Match, Retrieving user: ' + user_id);
            callback(200, null);
        } else {
            var user_ref = userRef.child(user_id);
            user_ref.remove(function (error) {
                if (error) callback(500, logger.logResponse('Error, Removing user: ' + error));
                deleteReferences(user_id);
                callback(200, logger.logResponse('Success, user deleted: ' + user_id));
            });
        }
    });
};


function validateUserTemplate(user_template, callback) {
    // TODO: Validate template
    // var user = require(path.resolve(__dirname, './templates/user.json'));
    // var account = require(path.resolve(__dirname, './templates/account.json'));
    // var line = require(path.resolve(__dirname, './templates/line.json'));
    // user.name = request.firstname + ' ' + request.lastname;
    // user.email = request.email;
    // user.number = request.number;
    // account.nick_name = request.firstname;
    // line.name = request.firstname;
    // line.number = request.number;
    // line.phone = request.phone;
    // account.lines.push(line);
    // user.account = account;
    callback(true);
}

function getUser(user_id, callback) {
    var user_ref = userRef.child(user_id);
    user_ref.once('value', function (user_snapshot) {
        user_snapshot.exists() ? callback(user_snapshot.val()) : callback(null);
    });
}

const account = require('./account');
const queue = require('./queue');
const uid = require('./uid');

function deleteReferences(user_id) {
    account.deleteAccount(user_id, function (status, response) {
        if (status !== 200) {
            logger.log('Error, Deleting reference accounts for user: ' + user_id);
        } else {
            logger.log('Success, deleted reference accounts for user: ' + user_id);
        }
    });
    queue.removeSpecificUser(user_id, function (status, response) {
        if (status !== 200) {
            logger.log('Error, Deleting reference queue items for user: ' + user_id);
        } else {
            logger.log('Success, deleted reference queue items for user: ' + user_id);
        }
    });
    uid.deleteMapping(user_id, null, function (status, response) {
        if (status !== 200) {
            logger.log('Error, Deleting reference uid mappings for user: ' + user_id);
        } else {
            logger.log('Success, deleted reference uid mappings for user: ' + user_id);
        }
    });
}